'reach 0.1';
'use strict';

const Transaction = Tuple(Address, UInt, Token);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null),
        tok: Token,
        price: UInt
    });

    const M = API('Market', {
        buy: Fun([], Transaction),
        stop: Fun([], Bool)
    });

    init();

    A.only(() => {
        const [tok, price] = declassify([interact.tok, interact.price]);
    });
    A.publish(tok, price);
    commit();

    const amount = 1;

    A.pay([[amount, tok]]);
    assert(balance(tok) == amount, "Balance of NFT is wrong");

    A.interact.onReady(getContract());
    A.interact.log("The token is on the market");

    commit();

    fork()
        .api(M.stop,
            (() => { assume(this == A); }),
            (() => 0),
            (k => {
                const isAdmin = this == A;
                k(isAdmin);
                require(isAdmin);
                transfer(amount, tok).to(this);
                commit();
                exit();
            }))
        .api(M.buy,
            () => price,
            (k => {
                k([this, price, tok]);
            }))
        .timeout(false);

    transfer(price).to(A);
    transfer(amount, tok).to(this);

    commit();
    exit();
});

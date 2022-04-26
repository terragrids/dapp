'reach 0.1';
'use strict';

const Transaction = Tuple(Address, UInt, Token);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
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

    A.pay([[1, tok]]);
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
                transfer(1, tok).to(this);
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
    transfer(1, tok).to(this);

    commit();
    exit();
});

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
        getToken: Fun([], Token),
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

    const [done, buyer, paid] =
        parallelReduce([false, A, 0])
            .invariant(balance() == paid && balance(tok) == 1)
            .while(!done)
            .api(M.stop,
                (() => { assume(this == A); }),
                (() => 0),
                (k => {
                    const isAdmin = this == A;
                    k(isAdmin);
                    return [true, buyer, paid]
                }))
            .api(M.getToken,
                (k => {
                    k(tok);
                    return [false, buyer, paid]
                }))
            .api(M.buy,
                () => price,
                (k => {
                    k([this, price, tok]);
                    return [true, this, price + paid];
                }))
            .timeout(false);

    transfer(paid).to(A);
    transfer(1, tok).to(buyer);
    commit();

    A.interact.log("The market is closing down...");

    exit();
});

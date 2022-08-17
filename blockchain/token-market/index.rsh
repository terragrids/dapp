'reach 0.1';
'use strict';

const Transaction = Tuple(Address, UInt, Token);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null),
        onSoldOrWithdrawn: Fun(true, Null),
        tok: Token,
        price: UInt
    });

    const M = API('Market', {
        buy: Fun([], Transaction),
        getToken: Fun([], Token),
        stop: Fun([], Bool)
    });

    const T = API('Tracker', {
        getToken: Fun([], Token),
        getPrice: Fun([], UInt),
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

    const [done, sold, buyer, paid] =
        parallelReduce([false, false, A, 0])
            .invariant(balance() == paid && balance(tok) == 1)
            .while(!done && !sold)
            .api(M.stop,
                (() => { assume(this == A); }),
                (() => 0),
                (k => {
                    const isAdmin = this == A;
                    require(isAdmin);
                    k(isAdmin);
                    return [true, false, buyer, paid]
                }))
            .api(M.getToken,
                (k => {
                    k(tok);
                    return [false, false, buyer, paid]
                }))
            .api(M.buy,
                () => price,
                (k => {
                    k([this, price, tok]);
                    return [false, true, this, price + paid];
                }))
            .timeout(false);

    transfer(paid).to(A);
    transfer(1, tok).to(buyer);

    A.interact.log("The token has been sold or withdrawn");
    A.interact.onSoldOrWithdrawn();

    if (done) {
        commit();
        exit();
    }

    A.interact.log("Tracking token....");

    require(balance() == 0);
    require(balance(tok) == 0);

    const [finished] =
        parallelReduce([false])
            .invariant(balance() == 0 && balance(tok) == 0)
            .while(!finished)
            .api(T.stop,
                (() => { assume(this == A); }),
                (() => 0),
                (k => {
                    const isAdmin = this == A;
                    require(isAdmin);
                    k(isAdmin);
                    return [true]
                }))
            .api(T.getToken,
                (k => {
                    k(tok);
                    return [false]
                }))
            .api(T.getPrice,
                (k => {
                    k(price);
                    return [false]
                }))
            .timeout(false);

    commit();

    A.interact.log("The tracker is closing down...");

    exit();
});

'reach 0.1';
'use strict';

const Transaction = Tuple(Address, UInt, Token);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null),
        onSoldOrWithdrawn: Fun(true, Null),
        tok: Token,
        price: UInt,
        sppContractInfo: Contract
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

    const SPP = {
        SolarPowerPlant_increaseCapacity: Fun([UInt], UInt)
    };

    init();

    A.only(() => {
        const [tok, price, sppContractInfo] = declassify([interact.tok, interact.price, interact.sppContractInfo]);
    });
    A.publish(tok, price, sppContractInfo);
    commit();

    const amount = 1;

    A.pay([[amount, tok]]);
    assert(balance(tok) == amount, "Balance of NFT is wrong");

    const spp = remote(sppContractInfo, SPP);
    const cap = spp.SolarPowerPlant_increaseCapacity(20)

    commit()

    A.only(() => {
        const capacity = cap
    });

    A.publish(capacity)

    A.interact.onReady(getContract(), sppContractInfo);
    A.interact.log("The token is on the market");

    const [done, sold,  buyer, paid] =
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

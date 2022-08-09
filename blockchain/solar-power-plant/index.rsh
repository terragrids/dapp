'reach 0.1';
'use strict';

const SolarPowerPlant = Tuple(UInt, UInt);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null)
    });

    const V = API('Vault', {
        stop: Fun([], Bool),
        getSolarPowerPlant: Fun([], SolarPowerPlant),
        increaseCapacity: Fun([UInt], UInt)
    });

    init();

    A.publish();

    A.interact.onReady(getContract());
    A.interact.log("The token vault is ready");

    const [done, buyer, paid, capacity, output] =
        parallelReduce([false, A, 0, 0, 0])
            .invariant(balance() == paid)
            .while(!done)
            .api(V.getSolarPowerPlant,
                (k => {
                    k([capacity, output]);
                    return [false, buyer, paid, capacity, output]
                }))
            .api(V.increaseCapacity,
                ((cap, k) => {
                    k(capacity + cap);
                    return [false, buyer, paid, capacity + cap, output]
                }))
            .api(V.stop,
                (() => { assume(this == A); }),
                (() => 0),
                (k => {
                    const isAdmin = this == A;
                    require(isAdmin);
                    k(isAdmin);
                    return [true, buyer, paid, capacity, output]
                }))
            .timeout(false);

    transfer(paid).to(A);
    commit();

    A.interact.log("The token vault is closing down...");

    exit();
});

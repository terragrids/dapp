'reach 0.1';
'use strict';

const SolarPowerPlant = Tuple(UInt, UInt);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null)
    });

    const V = API('SolarPowerPlant', {
        stop: Fun([], Bool),
        get: Fun([], SolarPowerPlant),
        setCapacity: Fun([UInt], UInt),
        increaseCapacity: Fun([UInt], UInt),
        decreaseCapacity: Fun([UInt], UInt),
        setOutput: Fun([UInt], UInt),
        increaseOutput: Fun([UInt], UInt)
    });

    init();

    A.publish();

    A.interact.onReady(getContract());
    A.interact.log("The solar power plant is ready");

    const [done, capacity, output] =
        parallelReduce([false, 0, 0])
            .invariant(balance() == 0)
            .while(!done)
            .api(V.get,
                (k => {
                    k([capacity, output]);
                    return [false, capacity, output]
                }))
            .api(V.setCapacity,
                ((amount, k) => {
                    k(amount);
                    return [false, amount, output]
                }))
            .api(V.increaseCapacity,
                ((amount, k) => {
                    const newCapacity = capacity + amount;
                    k(newCapacity);
                    return [false, newCapacity, output]
                }))
            .api(V.setOutput,
                ((amount, k) => {
                    k(amount);
                    return [false, capacity, amount]
                }))
            .api(V.increaseOutput,
                ((amount, k) => {
                    const newOutput = output + amount;
                    k(newOutput);
                    return [false, capacity, newOutput]
                }))
            .api(V.decreaseCapacity,
                ((amount, k) => {
                    if (amount > capacity) {
                        k(0);
                        return [false, 0, output]
                    }
                    else {
                        const newCapacity = capacity - amount;
                        k(newCapacity);
                        return [false, newCapacity, output]
                    }
                }))
            .api(V.stop,
                (() => { assume(this == A); }),
                (() => 0),
                (k => {
                    const isAdmin = this == A;
                    require(isAdmin);
                    k(isAdmin);
                    return [true, capacity, output]
                }))
            .timeout(false);

    commit();

    A.interact.log("The solar power plant is closing down...");

    exit();
});

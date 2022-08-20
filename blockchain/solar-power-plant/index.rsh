'reach 0.1';
'use strict';

const SolarPowerPlant = Tuple(UInt, UInt);

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null)
    });

    const SPP = API('SolarPowerPlant', {
        stop: Fun([], Bool),
        get: Fun([], SolarPowerPlant),
        setCapacity: Fun([UInt], UInt),
        increaseCapacity: Fun([UInt], UInt),
        decreaseCapacity: Fun([UInt], UInt),
        setOutput: Fun([UInt], UInt),
        increaseOutput: Fun([UInt], UInt)
    });

    const SPPView = View('SPPView', {
        capacity: UInt,
        output: UInt 
    });

    init();

    A.publish();

    A.interact.onReady(getContract());
    A.interact.log("The solar power plant is ready");

    const [done, capacity, output] =
        parallelReduce([false, 0, 0])
            .define(() => {
                SPPView.capacity.set(capacity)
                SPPView.output.set(output)
            })
            .invariant(balance() == 0)
            .while(!done)
            .api(SPP.get,
                (k => {
                    k([capacity, output]);
                    return [false, capacity, output]
                }))
            .api(SPP.setCapacity,
                ((amount, k) => {
                    k(amount);
                    return [false, amount, output]
                }))
            .api(SPP.increaseCapacity,
                ((amount, k) => {
                    const newCapacity = capacity + amount;
                    k(newCapacity);
                    return [false, newCapacity, output]
                }))
            .api(SPP.setOutput,
                ((amount, k) => {
                    k(amount);
                    return [false, capacity, amount]
                }))
            .api(SPP.increaseOutput,
                ((amount, k) => {
                    const newOutput = output + amount;
                    k(newOutput);
                    return [false, capacity, newOutput]
                }))
            .api(SPP.decreaseCapacity,
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
            .api(SPP.stop,
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

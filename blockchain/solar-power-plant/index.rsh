'reach 0.1'
'use strict'

/**
 * The Solar Power Plant has the following properties:
 * Capacity, Output, Total, Active
 *
 * Capacity is the total nominal power in TRW of all Terracells currently up for sale.
 * Output is the total nominal power in TRW of all Terracells already purchased by users.
 * Total is the total number of Terracells currently up for sale.
 * Active is the total number of Terracells already purchased by users.
 *
 * These counters are updated dynamically by Token Market Smart Contracts upon trading events (sell, buy, withdraw),
 * or by a frontend Admin Panel.
 */
const SolarPowerPlant = Tuple(UInt, UInt, UInt, UInt)

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null)
    })

    const SPP = API('SolarPowerPlant', {
        stop: Fun([], Bool),
        get: Fun([], SolarPowerPlant),
        setCapacity: Fun([UInt], Null),
        increaseCapacity: Fun([UInt], Null),
        decreaseCapacity: Fun([UInt], Null),
        setOutput: Fun([UInt], Null),
        increaseOutput: Fun([UInt], Null),
        setTotal: Fun([UInt], Null),
        setActive: Fun([UInt], Null)
    })

    const SPPView = View('SPPView', {
        capacity: UInt,
        output: UInt,
        total: UInt,
        active: UInt
    })

    init()

    A.publish()

    A.interact.onReady(getContract())
    A.interact.log('The solar power plant is ready')

    const [done, capacity, output, total, active] = parallelReduce([false, 0, 0, 0, 0])
        .define(() => {
            SPPView.capacity.set(capacity)
            SPPView.output.set(output)
            SPPView.total.set(total)
            SPPView.active.set(active)
        })
        .invariant(balance() == 0)
        .while(!done)
        /**
         * Returns a Tuple with all SPP properties.
         * It is generally preferable to use the SPPView instead to avoid transaction fees.
         */
        .api(SPP.get, k => {
            k([capacity, output, total, active])
            return [false, capacity, output, total, active]
        })
        /**
         * Sets the SPP Capacity to the specified amount of TRW.
         */
        .api(SPP.setCapacity, (amount, k) => {
            k(null)
            return [false, amount, output, total, active]
        })
        /**
         * Increases the SPP Capacity by the specified amount of TRW
         * and Total by one Terracell.
         */
        .api(SPP.increaseCapacity, (amount, k) => {
            k(null)
            return [false, capacity + amount, output, total + 1, active]
        })
        /**
         * Decreases the SPP Capacity by the specified amount of TRW
         * and Total by one Terracell.
         */
        .api(SPP.decreaseCapacity, (amount, k) => {
            if (amount > capacity && total == 0) {
                k(null)
                return [false, 0, output, 0, active]
            } else if (amount > capacity && total > 0) {
                k(null)
                return [false, 0, output, total - 1, active]
            } else if (amount < capacity && total == 0) {
                k(null)
                return [false, capacity - amount, output, 0, active]
            } else {
                k(null)
                return [false, capacity - amount, output, total - 1, active]
            }
        })
        /**
         * Sets the SPP Output to the specified amount of TRW.
         */
        .api(SPP.setOutput, (amount, k) => {
            k(null)
            return [false, capacity, amount, total, active]
        })
        /**
         * Increases the SPP Output by the specified amount of TRW
         * and Active by one Terracell.
         */
        .api(SPP.increaseOutput, (amount, k) => {
            k(null)
            return [false, capacity, output + amount, total, active + 1]
        })
        /**
         * Sets the SPP Total to the specified amount of Terracells.
         */
        .api(SPP.setTotal, (amount, k) => {
            k(null)
            return [false, capacity, output, amount, active]
        })
        /**
         * Sets the SPP Active to the specified amount of Terracells.
         */
        .api(SPP.setActive, (amount, k) => {
            k(null)
            return [false, capacity, output, total, amount]
        })
        /**
         * Stops this contract.
         */
        .api(
            SPP.stop,
            () => {
                assume(this == A)
            },
            () => 0,
            k => {
                const isAdmin = this == A
                require(isAdmin)
                k(isAdmin)
                return [true, capacity, output, total, active]
            }
        )
        .timeout(false)

    commit()

    A.interact.log('The solar power plant is closing down...')

    exit()
})

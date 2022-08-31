'reach 0.1'
'use strict'

const Price = UInt
const Transaction = Tuple(Address, Price, Token)

export const main = Reach.App(() => {
    const A = Participant('Admin', {
        ...hasConsoleLogger,
        onReady: Fun(true, Null),
        onSoldOrWithdrawn: Fun(true, Null),
        tok: Token,
        price: UInt,
        power: UInt,
        sppContractInfo: Contract
    })

    const M = API('Market', {
        buy: Fun([], Transaction),
        getToken: Fun([], Token),
        stop: Fun([], Bool)
    })

    const T = API('Tracker', {
        getToken: Fun([], Token),
        getPrice: Fun([], UInt),
        stop: Fun([], Bool)
    })

    const SPP = {
        SolarPowerPlant_increaseCapacity: Fun([UInt], Null),
        SolarPowerPlant_decreaseCapacity: Fun([UInt], Null),
        SolarPowerPlant_increaseOutput: Fun([UInt], Null)
    }

    init()

    A.only(() => {
        const [tok, price, power, sppContractInfo] = declassify([
            interact.tok,
            interact.price,
            interact.power,
            interact.sppContractInfo
        ])
    })
    A.publish(tok, price, power, sppContractInfo)
    commit()

    const amount = 1

    A.pay([[amount, tok]])
    assert(balance(tok) == amount, 'Balance of NFT is wrong')

    const spp = remote(sppContractInfo, SPP)

    if (power > 0) {
        spp.SolarPowerPlant_increaseCapacity(power)
    }

    A.interact.onReady(getContract(), sppContractInfo)
    A.interact.log('The token is on the market')

    const [withdrawn, sold, buyer, paid] = parallelReduce([false, false, A, 0])
        .invariant(balance() == paid && balance(tok) == 1)
        .while(!withdrawn && !sold)
        .api(
            M.stop,
            () => {
                assume(this == A)
            },
            () => 0,
            k => {
                const isAdmin = this == A
                require(isAdmin)
                k(isAdmin)
                return [true, false, buyer, paid]
            }
        )
        .api(M.getToken, k => {
            k(tok)
            return [false, false, buyer, paid]
        })
        .api(
            M.buy,
            () => price,
            k => {
                if (power > 0) {
                    spp.SolarPowerPlant_increaseOutput(power)
                }
                k([this, price, tok])
                return [false, true, this, price + paid]
            }
        )
        .timeout(false)

    transfer(paid).to(A)
    transfer(1, tok).to(buyer)

    A.interact.onSoldOrWithdrawn()

    if (withdrawn) {
        A.interact.log('The token has been withdrawn')
        // TODO reintroduce the lines below when this is solved: https://github.com/reach-sh/reach-lang/discussions/1354
        // if (power > 0) {
        //     spp.SolarPowerPlant_decreaseCapacity(power)
        // }
        commit()
        exit()
    }

    A.interact.log('The token has been sold')
    A.interact.log('Tracking token....')

    require(balance() == 0)
    require(balance(tok) == 0)

    const [finished] = parallelReduce([false])
        .invariant(balance() == 0 && balance(tok) == 0)
        .while(!finished)
        .api(
            T.stop,
            () => {
                assume(this == A)
            },
            () => 0,
            k => {
                const isAdmin = this == A
                require(isAdmin)
                k(isAdmin)
                return [true]
            }
        )
        .api(T.getToken, k => {
            k(tok)
            return [false]
        })
        .api(T.getPrice, k => {
            k(price)
            return [false]
        })
        .timeout(false)

    commit()

    A.interact.log('The tracker is closing down...')

    exit()
})

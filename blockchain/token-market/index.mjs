/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-console */
import { loadStdlib } from '@reach-sh/stdlib'
import assert from 'assert'
import * as backend from './build/index.main.mjs'
import * as sppBackend from './build/spp.main.mjs'

// Load Reach stdlib
const stdlib = loadStdlib()
if (stdlib.connector !== 'ALGO') {
    throw Error('stdlib.connector must be ALGO')
}

// Define utility functions
export class Signal {
    constructor() {
        const me = this
        this.p = new Promise(resolve => {
            me.r = resolve
        })
    }
    wait() {
        return this.p
    }
    notify() {
        this.r(true)
    }
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
const thread = async f => await f()
const threadWithDelay = async (f, ms) => {
    await timeout(ms)
    await f()
}
const threadWithNotify = async (f, signal) => {
    await f()
    signal.notify()
}
const threadWithWait = async (f, signal) => {
    await signal.wait()
    await f()
}

const algo = x => stdlib.formatCurrency(x, 4)
const fmt = x => `${algo(x)} ALGO`
const fmtToken = (x, token) => `${x} ${token.sym}`
const tokenPrice = 10

const getBalances = async (who, token) => {
    return await stdlib.balancesOf(who, [null, token.id])
}

const callAPI = async (name, f, successMsg, failureMsg, retries = 0) => {
    await timeout(10 * Math.random())

    async function call() {
        let result
        try {
            console.log(`${name} is calling the API`)
            result = await f()
            console.log(successMsg)
        } catch (e) {
            console.log(failureMsg)
            if (retries > 0) {
                retries--
                console.log('retrying...')
                await timeout(1000)
                result = await call()
            }
        }
        return result
    }

    return await call()
}

const setup = async () => {
    const startingBalance = stdlib.parseCurrency(100)

    // Create test accounts
    const accAdmin = await stdlib.newTestAccount(startingBalance)
    const accAlice = await stdlib.newTestAccount(startingBalance)
    const accBob = await stdlib.newTestAccount(startingBalance)

    // Launch token
    const gil = await stdlib.launchToken(accAdmin, 'gil', 'GIL', { supply: 1, decimals: 0 })

    // Opt-in to accept the token on ALGO
    await accAlice.tokenAccept(gil.id)
    await accBob.tokenAccept(gil.id)

    return [accAdmin, accAlice, accBob, gil]
}

const deploySpp = async account => {
    console.log('Deploying the SPP contract...')

    const sppReady = new Signal()

    // Deploy the spp backend
    const ctcSpp = account.contract(sppBackend)
    const sppApi = ctcSpp.a.SolarPowerPlant
    const sppView = ctcSpp.v.SPPView

    const logSppAndAssert = async (expCapacity, expOutput, expTotal, expActive) => {
        const capacity = (await sppView.capacity())[1].toNumber()
        const output = (await sppView.output())[1].toNumber()
        const total = (await sppView.total())[1].toNumber()
        const active = (await sppView.active())[1].toNumber()

        console.log('SPP info', { capacity, output, total, active })

        assert(capacity == expCapacity)
        assert(output == expOutput)
        assert(total == expTotal)
        assert(active == expActive)
    }

    let sppContractInfo

    sppBackend.Admin(ctcSpp, {
        log: (...args) => {
            console.log(...args)
        },
        onReady: async contract => {
            console.log(`SPP Contract deployed ${JSON.stringify(contract)}`)
            sppContractInfo = contract
            sppReady.notify()
        }
    })

    console.log('Waiting for the SPP contract...')

    await sppReady.wait()

    logSppAndAssert(0, 0, 0, 0)

    return { sppContractInfo, sppApi, logSppAndAssert }
}

const getAndLogAllBalances = async (accAdmin, accAlice, accBob, gil) => {
    const [adminAlgo, adminGil] = await getBalances(accAdmin, gil)
    const [aliceAlgo, aliceGil] = await getBalances(accAlice, gil)
    const [bobAlgo, bobGil] = await getBalances(accBob, gil)

    console.log(`Admin has ${fmt(adminAlgo)}`)
    console.log(`Admin has ${fmtToken(adminGil, gil)}`)

    console.log(`Alice has ${fmt(aliceAlgo)}`)
    console.log(`Alice has ${fmtToken(aliceGil, gil)}`)

    console.log(`Bob has ${fmt(bobAlgo)}`)
    console.log(`Bob has ${fmtToken(bobGil, gil)}`)

    return [algo(adminAlgo), adminGil, algo(aliceAlgo), aliceGil, algo(bobAlgo), bobGil]
}

const userConnectAndBuy = async (name, account, contract, gil, ready) => {
    return async () => {
        console.log(`${name} is attaching to the contract...`)
        const ctc = account.contract(backend, contract.getInfo())
        const market = ctc.a.Market

        const [algo1, gil1] = await getBalances(account, gil)

        console.log(`${name} has ${fmt(algo1)}`)
        console.log(`${name} has ${fmtToken(gil1, gil)}`)

        await ready.wait()

        console.log(`${name} is trying to buy a token...`)

        const token = await callAPI(
            name,
            () => market.getToken(),
            `${name} managed to fetch information about the token`,
            `${name} failed to fetch information about the token, because it is not on the market anymore`
        )

        if (token) console.log(token)

        await callAPI(
            name,
            () => market.buy(),
            `${name} managed to buy the token`,
            `${name} failed to buy the token, because it is not on the market anymore`
        )

        const [algo2, gil2] = await getBalances(account, gil)

        console.log(`${name} has ${fmt(algo2)}`)
        console.log(`${name} has ${fmtToken(gil2, gil)}`)
    }
}

const userConnectToTrackerAndStop = async (name, account, contract, gil, sold) => {
    return async () => {
        console.log(`${name} is attaching to the contract...`)
        const ctc = account.contract(backend, contract.getInfo())
        const tracker = ctc.a.Tracker

        const [algo1, gil1] = await getBalances(account, gil)

        console.log(`${name} has ${fmt(algo1)}`)
        console.log(`${name} has ${fmtToken(gil1, gil)}`)

        await sold.wait()

        console.log(`${name} is trying to get the token...`)

        const token = await callAPI(
            name,
            () => tracker.getToken(),
            `${name} managed to fetch information about the token`,
            `${name} failed to fetch information about the token, because it is not tracked`,
            10
        )

        if (token) console.log(token)

        console.log(`${name} has ${fmt(await stdlib.balanceOf(account))}`)
        console.log(`${name} is trying to get the token price...`)

        const price = await callAPI(
            name,
            () => tracker.getPrice(),
            `${name} managed to fetch information about the price`,
            `${name} failed to fetch information about the price, because it is not tracked`
        )

        if (price) {
            assert(algo(price.toNumber()) == tokenPrice)
            console.log(fmt(price.toNumber()))
        }

        console.log(`${name} has ${fmt(await stdlib.balanceOf(account))}`)
        console.log(`${name} is trying to stop the tracker...`)

        await callAPI(
            name,
            () => tracker.stop(),
            `${name} managed to stop the tracker`,
            `${name} failed to stop the tracker, because they do not have permission or the tracker is not running`
        )

        const [algo2, gil2] = await getBalances(account, gil)

        console.log(`${name} has ${fmt(algo2)}`)
        console.log(`${name} has ${fmtToken(gil2, gil)}`)
    }
}

const userConnectAndStop = async (name, account, contract, gil, ready) => {
    return async () => {
        console.log(`${name} is attaching to the contract...`)
        const ctc = account.contract(backend, contract.getInfo())
        const market = ctc.a.Market

        const [algo1, gil1] = await getBalances(account, gil)

        console.log(`${name} has ${fmt(algo1)}`)
        console.log(`${name} has ${fmtToken(gil1, gil)}`)

        await ready.wait()

        console.log(`${name} is trying to stop the contract...`)

        await callAPI(
            name,
            () => market.stop(),
            `${name} managed to stop the contract`,
            `${name} failed to stop the contract`
        )
    }
}

const testSellAndBuyAndStop = async () => {
    console.log('\n>> Test sell, buy, track and stop')

    const [accAdmin, accAlice, accBob, gil] = await setup()
    const ready = new Signal()
    const sold = new Signal()

    await getAndLogAllBalances(accAdmin, accAlice, accBob, gil)

    // Deploy the spp backend
    const { sppContractInfo, sppApi, logSppAndAssert } = await deploySpp(accAdmin)

    console.log('Deploying the Token Market contract...')

    // Deploy the token market backend
    const ctcTokenMarket = accAdmin.contract(backend)

    await Promise.all([
        thread(await userConnectAndBuy('Alice', accAlice, ctcTokenMarket, gil, ready)),
        thread(await userConnectAndBuy('Bob', accBob, ctcTokenMarket, gil, ready)),
        thread(await userConnectToTrackerAndStop('Admin', accAdmin, ctcTokenMarket, gil, sold)),
        backend.Admin(ctcTokenMarket, {
            log: (...args) => {
                console.log(...args)
            },
            onReady: async (contract, sppContract) => {
                console.log(
                    `Token Market Contract deployed ${JSON.stringify(contract)} with SPP contract ${JSON.stringify(
                        sppContract
                    )}`
                )
                const [adminAlgo, adminGil] = await getBalances(accAdmin, gil)
                assert(adminGil == 0)
                console.log(`Admin has ${fmt(adminAlgo)}`)
                console.log(`Admin has ${fmtToken(adminGil, gil)}`)

                logSppAndAssert(15, 0, 1, 0)

                ready.notify()
            },
            onSoldOrWithdrawn: async () => {
                sold.notify()
            },
            tok: gil.id,
            price: stdlib.parseCurrency(tokenPrice),
            power: 15,
            sppContractInfo
        })
    ])

    console.log('Token Market Contract stopped.')

    const [adminAlgo, adminGil, aliceAlgo, aliceGil, bobAlgo, bobGil] = await getAndLogAllBalances(
        accAdmin,
        accAlice,
        accBob,
        gil
    )

    assert(adminGil == 0)
    assert(parseFloat(adminAlgo) > 100)
    assert((aliceGil == 1 && bobGil == 0) || (aliceGil == 0 && bobGil == 1))
    assert(
        (parseFloat(aliceAlgo) < 90 && parseFloat(bobAlgo) > 90) ||
            (parseFloat(bobAlgo) < 90 && parseFloat(aliceAlgo) > 90)
    )

    logSppAndAssert(15, 15, 1, 1)

    await callAPI('Admin', () => sppApi.stop(), 'Admin managed to stop the spp', 'Admin failed to stop the spp')
}

const testSellAndStop = async () => {
    console.log('\n>> Test sell and stop')
    const [accAdmin, accAlice, accBob, gil] = await setup()
    const ready = new Signal()
    const withdrawn = new Signal()

    await getAndLogAllBalances(accAdmin, accAlice, accBob, gil)

    // Deploy the spp backend
    const { sppContractInfo, sppApi, logSppAndAssert } = await deploySpp(accAdmin)

    console.log('Deploying the Token Market contract...')

    // Deploy the token market backend
    const ctcTokenMarket = accAdmin.contract(backend)

    await Promise.all([
        thread(await userConnectAndStop('Admin', accAdmin, ctcTokenMarket, gil, ready)),
        backend.Admin(ctcTokenMarket, {
            log: (...args) => {
                console.log(...args)
            },
            onReady: async (contract, sppContract) => {
                console.log(
                    `Token Market Contract deployed ${JSON.stringify(contract)} with SPP contract ${JSON.stringify(
                        sppContract
                    )}`
                )
                const [adminAlgo, adminGil] = await getBalances(accAdmin, gil)
                assert(adminGil == 0)
                console.log(`Admin has ${fmt(adminAlgo)}`)
                console.log(`Admin has ${fmtToken(adminGil, gil)}`)

                logSppAndAssert(7, 0, 1, 0)

                ready.notify()
            },
            onSoldOrWithdrawn: async () => {
                withdrawn.notify()
            },
            power: 7,
            tok: gil.id,
            price: stdlib.parseCurrency(10),
            sppContractInfo
        })
    ])

    await withdrawn.wait()

    console.log('Token Market Contract stopped.')

    const [adminAlgo, adminGil, aliceAlgo, aliceGil, bobAlgo, bobGil] = await getAndLogAllBalances(
        accAdmin,
        accAlice,
        accBob,
        gil
    )

    assert(adminGil == 1)
    assert(parseFloat(adminAlgo) > 99)
    assert(aliceGil == 0 && bobGil == 0)
    assert(parseFloat(aliceAlgo) > 99 && parseFloat(bobAlgo) > 99)

    // TODO this should be logSppAndAssert(0, 0, 0, 0) once this issue has been fixed: https://github.com/reach-sh/reach-lang/issues/1358
    logSppAndAssert(7, 0, 1, 0)

    await callAPI('Admin', () => sppApi.stop(), 'Admin managed to stop the spp', 'Admin failed to fstop the spp')
}

const testSellZeroPowerAndNonAdminStopAndBuy = async () => {
    console.log('\n>> Test sell and non-admin stop and buy')

    const [accAdmin, accAlice, accBob, gil] = await setup()
    const ready = new Signal()
    const sold = new Signal()
    const nonAdminStopAttempted = new Signal()

    await getAndLogAllBalances(accAdmin, accAlice, accBob, gil)

    // Deploy the spp backend
    const { sppContractInfo, sppApi, logSppAndAssert } = await deploySpp(accAdmin)

    console.log('Deploying the Token Market contract...')

    // Deploy the token market backend
    const ctcTokenMarket = accAdmin.contract(backend)

    await Promise.all([
        thread(await userConnectAndStop('Bob', accBob, ctcTokenMarket, gil, ready)),
        threadWithDelay(await userConnectAndBuy('Alice', accAlice, ctcTokenMarket, gil, ready), 10),
        threadWithNotify(
            await userConnectToTrackerAndStop('Bob', accBob, ctcTokenMarket, gil, sold),
            nonAdminStopAttempted
        ),
        threadWithWait(
            await userConnectToTrackerAndStop('Admin', accAdmin, ctcTokenMarket, gil, sold),
            nonAdminStopAttempted
        ),
        backend.Admin(ctcTokenMarket, {
            log: (...args) => {
                console.log(...args)
            },
            onReady: async (contract, sppContract) => {
                console.log(
                    `Token Market Contract deployed ${JSON.stringify(contract)} with SPP contract ${JSON.stringify(
                        sppContract
                    )}`
                )
                const [adminAlgo, adminGil] = await getBalances(accAdmin, gil)
                assert(adminGil == 0)
                console.log(`Admin has ${fmt(adminAlgo)}`)
                console.log(`Admin has ${fmtToken(adminGil, gil)}`)

                logSppAndAssert(0, 0, 0, 0)

                ready.notify()
            },
            onSoldOrWithdrawn: async () => {
                sold.notify()
            },
            power: 0,
            tok: gil.id,
            price: stdlib.parseCurrency(10),
            sppContractInfo
        })
    ])

    console.log('Token Market Contract stopped.')

    const [adminAlgo, adminGil, aliceAlgo, aliceGil, bobAlgo, bobGil] = await getAndLogAllBalances(
        accAdmin,
        accAlice,
        accBob,
        gil
    )

    assert(adminGil == 0)
    assert(parseFloat(adminAlgo) > 100)
    assert(aliceGil == 1 && bobGil == 0)
    assert(parseFloat(aliceAlgo) < 99 && parseFloat(bobAlgo) > 99)

    logSppAndAssert(0, 0, 0, 0)

    await callAPI('Admin', () => sppApi.stop(), 'Admin managed to stop the spp', 'Admin failed to stop the spp')
}

await testSellAndBuyAndStop()
await testSellAndStop()
await testSellZeroPowerAndNonAdminStopAndBuy()

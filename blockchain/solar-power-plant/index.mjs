/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-console */
import { loadStdlib } from '@reach-sh/stdlib'
import assert from 'assert'
import * as backend from './build/index.main.mjs'

// Load Reach stdlib
const stdlib = loadStdlib()
if (stdlib.connector !== 'ALGO') {
    throw Error('stdlib.connector must be ALGO')
}

// Define utility functions
export class Signal {
    constructor() {
        const me = this
        this.p = new Promise((resolve) => { me.r = resolve })
    }
    wait() { return this.p }
    notify() { this.r(true) }
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
const thread = async (f) => await f()

const algo = (x) => stdlib.formatCurrency(x, 4)
const fmt = (x) => `${algo(x)} ALGO`
const fmtToken = (x, token) => `${x} ${token.sym}`

const getBalances = async (who, token) => {
    return await stdlib.balancesOf(who, [null, token.id])
}

const callAPI = async (name, f, successMsg, failureMsg) => {
    console.log(`${name} is calling the API`)
    await timeout(10 * Math.random())
    let result
    try {
        result = await f()
        console.log(successMsg)
    }
    catch (e) {
        console.log(failureMsg)
    }
    return result
}

const setup = async () => {
    const startingBalance = stdlib.parseCurrency(100)

    // Create test accounts
    const accAdmin = await stdlib.newTestAccount(startingBalance)
    const accAlice = await stdlib.newTestAccount(startingBalance)
    const accBob = await stdlib.newTestAccount(startingBalance)

    // Launch token
    const trcl = await stdlib.launchToken(accAdmin, 'Terracell', 'TRCL', { supply: 1, decimals: 0 })

    // Opt-in to accept the token on ALGO
    await accAlice.tokenAccept(trcl.id)
    await accBob.tokenAccept(trcl.id)

    return [accAdmin, accAlice, accBob, trcl]
}

const getAndLogAllBalances = async (accAdmin, accAlice, accBob, trcl) => {
    const [adminAlgo, adminTrcl] = await getBalances(accAdmin, trcl)
    const [aliceAlgo, aliceTrcl] = await getBalances(accAlice, trcl)
    const [bobAlgo, bobTrcl] = await getBalances(accBob, trcl)

    console.log(`Admin has ${fmt(adminAlgo)}`)
    console.log(`Admin has ${fmtToken(adminTrcl, trcl)}`)

    console.log(`Alice has ${fmt(aliceAlgo)}`)
    console.log(`Alice has ${fmtToken(aliceTrcl, trcl)}`)

    console.log(`Bob has ${fmt(bobAlgo)}`)
    console.log(`Bob has ${fmtToken(bobTrcl, trcl)}`)

    return [algo(adminAlgo), adminTrcl, algo(aliceAlgo), aliceTrcl, algo(bobAlgo), bobTrcl]
}

const userConnectAndStop = async (name, account, contract, trcl, ready) => {
    return async () => {
        console.log(`${name} is attaching to the contract...`)
        const ctc = account.contract(backend, contract.getInfo())
        const vault = ctc.a.Vault

        const [algo1, trcl1] = await getBalances(account, trcl)

        console.log(`${name} has ${fmt(algo1)}`)
        console.log(`${name} has ${fmtToken(trcl1, trcl)}`)

        await ready.wait()

        let spp = await callAPI(
            name,
            () => vault.getSolarPowerPlant(),
            `${name} managed to get the spp`,
            `${name} failed to get the spp`
        )

        console.log(`${name} sees that spp has `, {
            capacity: spp[0].toNumber(),
            output: spp[1].toNumber()
        })

        assert(spp[0].toNumber() == 0)
        assert(spp[1].toNumber() == 0)

        await callAPI(
            name,
            () => vault.increaseCapacity(25),
            `${name} managed to increase the spp capacity`,
            `${name} failed to increase the spp capacity`
        )

        spp = await callAPI(
            name,
            () => vault.getSolarPowerPlant(),
            `${name} managed to get the spp`,
            `${name} failed to get the spp`
        )

        console.log(`${name} sees that spp has `, {
            capacity: spp[0].toNumber(),
            output: spp[1].toNumber()
        })

        assert(spp[0].toNumber() == 25)
        assert(spp[1].toNumber() == 0)

        console.log(`${name} is trying to stop the contract...`)

        await callAPI(
            name,
            () => vault.stop(),
            `${name} managed to stop the contract`,
            `${name} failed to stop the contract`
        )
    }
}

const testSellAndStop = async () => {
    console.log('>> Test sell and stop')
    const [accAdmin, accAlice, accBob, trcl] = await setup()
    const ready = new Signal()

    await getAndLogAllBalances(accAdmin, accAlice, accBob, trcl)

    console.log('Deploying the contract...')

    // Deploy the dapp
    const ctcAdmin = accAdmin.contract(backend)

    await Promise.all([
        thread(await userConnectAndStop('Admin', accAdmin, ctcAdmin, trcl, ready)),
        backend.Admin(ctcAdmin, {
            log: ((...args) => {
                console.log(...args)
                ready.notify()
            }),
            onReady: async (contract) => {
                console.log(`Contract deployed ${JSON.stringify(contract)}`)
                const [adminAlgo, adminTrcl] = await getBalances(accAdmin, trcl)
                assert(adminTrcl == 1)
                console.log(`Admin has ${fmt(adminAlgo)}`)
                console.log(`Admin has ${fmtToken(adminTrcl, trcl)}`)
            },
            tok: trcl.id,
            price: stdlib.parseCurrency(10)
        })
    ])

    console.log('Contract stopped.')
    const [adminAlgo, adminTrcl, aliceAlgo, aliceTrcl, bobAlgo, bobTrcl] = await getAndLogAllBalances(accAdmin, accAlice, accBob, trcl)

    assert(adminTrcl == 1)
    assert(parseFloat(adminAlgo) > 99)
    assert(aliceTrcl == 0 && bobTrcl == 0)
    assert(parseFloat(aliceAlgo) > 99 && parseFloat(bobAlgo) > 99)
}

await testSellAndStop()

/* eslint-disable no-console */
import { loadStdlib } from '@reach-sh/stdlib'
import assert from 'assert'
import * as backend from './build/index.main.mjs'

// Define utility functions
export class Signal {
    constructor() {
        const me = this
        this.p = new Promise((resolve) => { me.r = resolve })
    }
    wait() { return this.p }
    notify() { this.r(true) }
};

const thread = async (f) => await f()

const algo = (x) => stdlib.formatCurrency(x, 4)
const fmt = (x) => `${algo(x)} ALGO`
const fmtToken = (x, token) => `${x} ${token.sym}`

const getBalances = async (who, token) => {
    return await stdlib.balancesOf(who, [null, token.id])
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

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

// Load Reach stdlib
const stdlib = loadStdlib()
if (stdlib.connector !== 'ALGO') {
    throw Error('stdlib.connector must be ALGO')
}

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

const getAndLogAllBalances = async () => {
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

const user = async (name, account, contract, ready) => {
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

const test = async () => {
    const ready = new Signal()

    await getAndLogAllBalances()

    console.log('Deploying the contract...')

    // Deploy the dapp
    const ctcAdmin = accAdmin.contract(backend)

    await Promise.all([
        thread(await user('Alice', accAlice, ctcAdmin, ready)),
        thread(await user('Bob', accBob, ctcAdmin, ready)),
        backend.Admin(ctcAdmin, {
            log: ((...args) => {
                console.log(...args)
                ready.notify()
            }),
            onReady: async (contract) => {
                console.log(`Contract deployed ${JSON.stringify(contract)}`)
                const [adminAlgo, adminGil] = await getBalances(accAdmin, gil)
                assert(adminGil == 0)
                console.log(`Admin has ${fmt(adminAlgo)}`)
                console.log(`Admin has ${fmtToken(adminGil, gil)}`)
            },
            tok: gil.id,
            price: stdlib.parseCurrency(10)
        })
    ])

    console.log('Token sold.')
    const [adminAlgo, adminGil, aliceAlgo, aliceGil, bobAlgo, bobGil] = await getAndLogAllBalances()

    assert(adminGil == 0)
    assert(parseFloat(adminAlgo) > 100)
    assert((aliceGil == 1 && bobGil == 0) || (aliceGil == 0 && bobGil == 1))
    assert((parseFloat(aliceAlgo) < 90 && parseFloat(bobAlgo) > 90) || (parseFloat(bobAlgo) < 90 && parseFloat(aliceAlgo) > 90))
}

await test()

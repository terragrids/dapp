/* eslint-disable no-console */
import { loadStdlib } from '@reach-sh/stdlib'
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

const fmt = (x) => stdlib.formatCurrency(x, 4)

const getTokenBalance = async (token, who) => {
    const amt = await stdlib.balanceOf(who, token.id)
    return `${amt} ${token.sym}`
}

const getBalance = async (who) => {
    const amt = await stdlib.balanceOf(who)
    return `${fmt(amt)} ALGO`
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const buyToken = async (name, f) => {
    console.log(`${name} is calling the API`)
    await timeout(10 * Math.random())
    let result
    try {
        result = await f()
        console.log(`${name} managed to buy the token`)
    }
    catch (e) {
        console.log(`${name} failed to buy the token, because it is not on the market anymore`)
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

const logAllBalances = async () => {
    console.log(`Admin has ${await getTokenBalance(gil, accAdmin)}`)
    console.log(`Admin has ${await getBalance(accAdmin)}`)
    console.log(`Alice has ${await getTokenBalance(gil, accAlice)}`)
    console.log(`Alice has ${await getBalance(accAlice)}`)
    console.log(`Bob has ${await getTokenBalance(gil, accBob)}`)
    console.log(`Bob has ${await getBalance(accBob)}`)
}

const user = async (name, account, contract, ready) => {
    return async () => {
        console.log(`${name} is attaching to the contract...`)
        const ctc = account.contract(backend, contract.getInfo())
        const market = ctc.a.Market

        console.log(`${name} has ${await getTokenBalance(gil, account)}`)
        console.log(`${name} has ${await getBalance(account)}`)

        await ready.wait()

        console.log(`${name} is trying to buy a token...`)

        await buyToken(name, () => market.buy())

        console.log(`${name} has ${await getTokenBalance(gil, account)}`)
        console.log(`${name} has ${await getBalance(account)}`)
    }
}

const test = async () => {
    const ready = new Signal()

    await logAllBalances()

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
            tok: gil.id,
            price: stdlib.parseCurrency(10)
        })
    ])

    console.log('Token sold.')
    await logAllBalances()
}

await test()

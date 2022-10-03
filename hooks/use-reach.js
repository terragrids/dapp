import { useRef, useState, useEffect } from 'react'
import * as tokenMarketBackend from '../blockchain/token-market/build/index.main.mjs'
import * as sppBackend from '../blockchain/solar-power-plant/build/index.main.mjs'

export function useReach() {
    const stdlib = useRef()
    const myAlgoConnect = useRef()
    const walletConnect = useRef()
    const makePeraConnect = useRef()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadLibs() {
            const reachStdlib = await import('@reach-sh/stdlib')
            stdlib.current = reachStdlib.loadStdlib({
                ...process.env,
                REACH_CONNECTOR_MODE: process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE
            })
            myAlgoConnect.current = reachStdlib.ALGO_MyAlgoConnect
            walletConnect.current = reachStdlib.ALGO_WalletConnect
            makePeraConnect.current = reachStdlib.ALGO_MakePeraConnect
            setLoading(false)
        }
        loadLibs()
    }, [])

    return {
        tokenMarketBackend,
        sppBackend,
        stdlib: stdlib.current,
        myAlgoConnect: myAlgoConnect.current,
        walletConnect: walletConnect.current,
        makePeraConnect: makePeraConnect.current,
        loading
    }
}

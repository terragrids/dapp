import { useRef, useState, useEffect, useCallback } from 'react'
import * as tokenMarketBackend from '../blockchain/token-market/build/index.main.mjs'
import * as sppBackend from '../blockchain/solar-power-plant/build/index.main.mjs'

export function useReach() {
    const reachStdlib = useRef()
    const stdlib = useRef()
    const myAlgoConnect = useRef()
    const walletConnect = useRef()

    const [loading, setLoading] = useState(true)

    const reload = useCallback(() => {
        stdlib.current = reachStdlib.current.loadStdlib({
            ...process.env,
            REACH_CONNECTOR_MODE: process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE
        })
        myAlgoConnect.current = reachStdlib.current.ALGO_MyAlgoConnect
        walletConnect.current = reachStdlib.current.ALGO_WalletConnect
    }, [])

    useEffect(() => {
        async function loadLibs() {
            reachStdlib.current = await import('@reach-sh/stdlib')
            reload()
            setLoading(false)
        }
        loadLibs()
    }, [reload])

    return {
        tokenMarketBackend,
        sppBackend,
        stdlib: stdlib.current,
        myAlgoConnect: myAlgoConnect.current,
        walletConnect: walletConnect.current,
        loading,
        reload
    }
}

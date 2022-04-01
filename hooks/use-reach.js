import { useRef, useState, useEffect } from 'react'
import * as backend from '../build/index.main.mjs'

export function useReach() {
    const stdlib = useRef()
    const myAlgoConnect = useRef()
    const walletConnect = useRef()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadLibs() {
            const reachStdlib = await import('@reach-sh/stdlib')
            stdlib.current = reachStdlib.loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE })
            myAlgoConnect.current = reachStdlib.ALGO_MyAlgoConnect
            walletConnect.current = reachStdlib.ALGO_WalletConnect
            setLoading(false)
        }
        loadLibs()
    }, [])

    return {
        backend,
        stdlib: stdlib.current,
        myAlgoConnect: myAlgoConnect.current,
        walletConnect: walletConnect.current,
        loading
    }
}
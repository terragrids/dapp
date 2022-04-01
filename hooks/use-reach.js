import { useRef, useState, useEffect } from 'react'
import * as backend from '../build/index.main.mjs'

export function useReach() {
    const stdlib = useRef()
    const myAlgoConnect = useRef()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadLibs() {
            let [reachStdlib, myAlgoConnectLib] = await Promise.all([
                import('@reach-sh/stdlib'),
                import('@reach-sh/stdlib/ALGO_MyAlgoConnect')])
            stdlib.current = reachStdlib.loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE })
            myAlgoConnect.current = myAlgoConnectLib.default
            setLoading(false)
        }
        loadLibs()
    }, [])

    return { backend, stdlib: stdlib.current, myAlgoConnect: myAlgoConnect.current, loading }
}
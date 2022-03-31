import { useRef, useState, useEffect } from 'react'

export function useReach() {
    const stdlib = useRef()
    const myAlgoConnect = useRef()
    const backend = useRef()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadLibs() {
            let [reachStdlib, myAlgoConnectLib, backend] = await Promise.all([
                import('@reach-sh/stdlib'),
                import('@reach-sh/stdlib/ALGO_MyAlgoConnect'),
                import('../build/index.main.mjs')
            ])
            stdlib.current = reachStdlib.loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE })
            myAlgoConnect.current = myAlgoConnectLib.default
            backend.current = backend
            setLoading(false)
        }
        loadLibs()
    }, [])

    return { backend, stdlib: stdlib.current, myAlgoConnect: myAlgoConnect.current, loading }
}
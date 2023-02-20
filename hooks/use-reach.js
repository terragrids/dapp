import { useRef, useState, useEffect, useCallback } from 'react'
import * as tokenMarketBackend from '../blockchain/token-market/build/index.main.mjs'
import * as sppBackend from '../blockchain/solar-power-plant/build/index.main.mjs'
import * as nftContractBackend from '../blockchain/nft-contract/index.main.mjs'

export function useReach() {
    const reachStdlib = useRef()
    const stdlib = useRef()
    const myAlgoConnect = useRef()
    const makeWalletConnect = useRef()
    const walletConnect = useRef()
    const qrCodeModal = useRef()

    const [loading, setLoading] = useState(true)

    const reload = useCallback(() => {
        stdlib.current = reachStdlib.current.loadStdlib({
            ...process.env,
            REACH_CONNECTOR_MODE: process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE
        })
    }, [])

    useEffect(() => {
        async function loadLibs() {
            const [stdlib, myAlgoConnectLib, walletConnectLib, qrCodeModalLib] = await Promise.all([
                import('@reach-sh/stdlib'),
                import('@randlabs/myalgo-connect'),
                import('@walletconnect/client'),
                import('algorand-walletconnect-qrcode-modal')
            ])

            reachStdlib.current = stdlib
            myAlgoConnect.current = myAlgoConnectLib.default
            makeWalletConnect.current = stdlib.default.ALGO_MakeWalletConnect
            walletConnect.current = walletConnectLib.default
            qrCodeModal.current = qrCodeModalLib.default
            reload()
            setLoading(false)
        }
        loadLibs()
    }, [reload])

    return {
        tokenMarketBackend,
        sppBackend,
        nftContractBackend,
        stdlib: stdlib.current,
        myAlgoConnect: myAlgoConnect.current,
        makeWalletConnect: makeWalletConnect.current,
        walletConnect: walletConnect.current,
        qrCodeModal: qrCodeModal.current,
        loading,
        reload
    }
}

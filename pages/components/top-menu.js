import { strings } from '../../strings/en'
import styles from './top-menu.module.scss'
import React, { useRef, useEffect } from 'react'

export default function TopMenu() {
    const reach = useRef()

    async function connectWallet() {
        const acc = await reach.current.getDefaultAccount()
        const balance = await reach.current.balanceOf(acc)
        reach.current.formatCurrency(balance, 4)
    }

    useEffect(() => {
        async function loadLibs() {
            let [reachStdlib, myAlgoConnect] = await Promise.all([import('@reach-sh/stdlib'), import('@reach-sh/stdlib/ALGO_MyAlgoConnect')])

            const MyAlgoConnect = myAlgoConnect.default

            reach.current = reachStdlib.loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE })
            reach.current.setWalletFallback(reach.current.walletFallback({
                providerEnv: 'TestNet', MyAlgoConnect
            }))
        }
        loadLibs()
    }, [])

    return (
        <nav>
            <ul className={styles.top}>
                <li className={styles.brand} onClick={connectWallet}>{strings.connectWallet}</li>
            </ul>
        </nav>
    )
}
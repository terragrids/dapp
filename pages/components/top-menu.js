import { strings } from '../../strings/en'
import styles from './top-menu.module.scss'
import { loadStdlib } from '@reach-sh/stdlib'
import React, { useRef } from 'react'

let MyAlgoConnect
import('@reach-sh/stdlib/ALGO_MyAlgoConnect').then((module) => {
    MyAlgoConnect = module.default
})

export default function TopMenu() {
    const reach = useRef(loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE }))

    async function connectWallet() {
        reach.current.setWalletFallback(reach.current.walletFallback({
            providerEnv: 'TestNet', MyAlgoConnect
        }))

        const acc = await reach.current.getDefaultAccount()

        const balAtomic = await reach.current.balanceOf(acc)
        reach.current.formatCurrency(balAtomic, 4)
    }

    return (
        <nav>
            <ul className={styles.top}>
                <li className={styles.brand} onClick={connectWallet}>{strings.connectWallet}</li>
            </ul>
        </nav>
    )
}
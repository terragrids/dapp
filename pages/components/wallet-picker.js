import { useRef, useEffect } from 'react'
import { strings } from '../../strings/en'
import ModalDialog from './modal-dialog'
import styles from './wallet-picker.module.scss'
import PropTypes from 'prop-types'
import PeraWallet from '../../public/images/pera-wallet-logo.svg'
import MyAlgoWallet from '../../public/images/myalgo-wallet-logo.svg'
import AlgoSignerWallet from '../../public/images/algo-signer-wallet-logo.svg'

export default function WalletPicker({ visible, onClose }) {
    const reach = useRef()
    const myAlgoConnect = useRef()

    async function connectMyAlgoWallet() {
        setWallet({ MyAlgoConnect: myAlgoConnect.current })
        await connectWallet()
    }

    function setWallet(wallet) {
        reach.current.setWalletFallback(reach.current.walletFallback({
            providerEnv: 'TestNet', ...wallet
        }))
    }

    async function connectWallet() {
        const acc = await reach.current.getDefaultAccount()
        const balance = await reach.current.balanceOf(acc)
        reach.current.formatCurrency(balance, 4)
    }

    useEffect(() => {
        async function loadLibs() {
            let [reachStdlib, myAlgoConnectLib] = await Promise.all([
                import('@reach-sh/stdlib'),
                import('@reach-sh/stdlib/ALGO_MyAlgoConnect')
            ])

            reach.current = reachStdlib.loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE })
            myAlgoConnect.current = myAlgoConnectLib.default
        }
        loadLibs()
    }, [])

    return (
        <ModalDialog
            visible={visible}
            title={strings.connectWallet}
            onClose={onClose}>
            <div className={styles.container}>
                <ul>
                    <li><PeraWallet /><div className={styles.text}>{strings.peraWallet}</div></li>
                    <li onClick={connectMyAlgoWallet}><MyAlgoWallet /><div className={styles.text}>{strings.myAlgoWallet}</div></li>
                    <li><AlgoSignerWallet /><div className={styles.text}>{strings.algoSigner}</div></li>
                </ul>
            </div>
        </ModalDialog>
    )
}

WalletPicker.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
}
import { useRef, useState, useEffect, useContext } from 'react'
import { strings } from '../../strings/en'
import ModalDialog from './modal-dialog'
import styles from './wallet-picker.module.scss'
import PropTypes from 'prop-types'
import PeraWallet from '../../public/images/pera-wallet-logo.svg'
import MyAlgoWallet from '../../public/images/myalgo-wallet-logo.svg'
import AlgoSignerWallet from '../../public/images/algo-signer-wallet-logo.svg'
import LoadingSpinner from './loading-spinner'
import { UserContext } from '../context/user-context'

export default function WalletPicker({ visible, onClose }) {
    const reach = useRef()
    const myAlgoConnect = useRef()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const user = useContext(UserContext)

    async function connectMyAlgoWallet() {
        setWallet({ MyAlgoConnect: myAlgoConnect.current })
        await connectWallet()
    }

    function setWallet(wallet) {
        setError()
        reach.current.setWalletFallback(reach.current.walletFallback({
            providerEnv: 'TestNet', ...wallet
        }))
    }

    async function connectWallet() {
        let account
        try {
            setLoading(true)
            account = await reach.current.getDefaultAccount()
            const balance = await reach.current.balanceOf(account)

            user.update({
                authenticated: true,
                walletAddress: account.networkAccount.addr,
                walletBalance: reach.current.formatCurrency(balance, 4)
            })

            setLoading(false)
            onClose()
        } catch (e) {
            setLoading(false)
            setError(strings.errorConnectingWallet)
            return
        }
    }

    useEffect(() => {
        async function loadLibs() {
            let [reachStdlib, myAlgoConnectLib] = await Promise.all([
                import('@reach-sh/stdlib'),
                import('@reach-sh/stdlib/ALGO_MyAlgoConnect')
            ])
            reach.current = reachStdlib.loadStdlib({ ...process.env, 'REACH_CONNECTOR_MODE': process.env.NEXT_PUBLIC_REACH_CONNECTOR_MODE })
            myAlgoConnect.current = myAlgoConnectLib.default
            setLoading(false)
        }
        loadLibs()
    }, [])

    useEffect(() => {
        if (visible) setError()
    }, [visible])

    return (
        <ModalDialog
            visible={visible}
            title={strings.connectWallet}
            onClose={onClose}>
            <div className={styles.container}>
                {loading &&
                    <div className={styles.loading}><LoadingSpinner /></div>
                }
                {!loading &&
                    <ul>
                        <li onClick={connectMyAlgoWallet}><MyAlgoWallet /><div className={styles.text}>{strings.myAlgoWallet}</div></li>
                        <li className={styles.disabled}><PeraWallet /><div className={styles.text}>{strings.peraWallet} - {strings.comingSoon}</div></li>
                        <li className={styles.disabled}><AlgoSignerWallet /><div className={styles.text}>{strings.algoSigner} - {strings.comingSoon}</div></li>
                    </ul>
                }
                {error &&
                    <div className={styles.error}>{error}</div>
                }
            </div>
        </ModalDialog>
    )
}

WalletPicker.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
}
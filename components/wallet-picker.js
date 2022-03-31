import { useState, useEffect, useContext } from 'react'
import { strings } from '../strings/en'
import ModalDialog from './modal-dialog'
import styles from './wallet-picker.module.scss'
import PropTypes from 'prop-types'
import PeraWallet from '../public/images/pera-wallet-logo.svg'
import MyAlgoWallet from '../public/images/myalgo-wallet-logo.svg'
import AlgoSignerWallet from '../public/images/algo-signer-wallet-logo.svg'
import LoadingSpinner from './loading-spinner'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export default function WalletPicker({ visible, onClose }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const reach = useContext(ReachContext)
    const user = useContext(UserContext)

    async function connectMyAlgoWallet() {
        setWallet({ MyAlgoConnect: reach.myAlgoConnect })
        await connectWallet()
    }

    function setWallet(wallet) {
        setError()
        reach.stdlib.setWalletFallback(reach.stdlib.walletFallback({
            providerEnv: process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER, ...wallet
        }))
    }

    async function connectWallet() {
        let account
        try {
            setLoading(true)
            account = await reach.stdlib.getDefaultAccount()
            const balance = await reach.stdlib.balanceOf(account)

            user.update({
                authenticated: true,
                walletAddress: account.networkAccount.addr,
                walletBalance: reach.stdlib.formatCurrency(balance, 4)
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
        if (visible) setError()
    }, [visible])

    const showLoading = loading || reach.loading

    return (
        <ModalDialog
            visible={visible}
            title={strings.connectWallet}
            onClose={onClose}>
            <div className={styles.container}>
                {showLoading &&
                    <div className={styles.loading}><LoadingSpinner /></div>
                }
                {!showLoading &&
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
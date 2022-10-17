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
import { endpoints } from '../utils/api-config'
import { getWalletNoteUrl } from 'utils/string-utils'

export default function WalletPicker({ visible, onClose }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const reach = useContext(ReachContext)
    const user = useContext(UserContext)

    async function connectMyAlgoWallet() {
        await setWallet({ MyAlgoConnect: reach.myAlgoConnect })
        await connectWallet()
        await statelessAuthenticate()
    }

    async function connectPeraWallet() {
        await setWallet({ WalletConnect: reach.walletConnect })
        await connectWallet()
        await statelessAuthenticate()
    }

    async function setWallet(wallet) {
        setError()
        delete window.algorand
        reach.reload()
        reach.stdlib.setWalletFallback(
            reach.stdlib.walletFallback({
                providerEnv: process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER,
                ...wallet
            })
        )
    }

    async function connectWallet() {
        try {
            setLoading(true)

            const account = await reach.stdlib.getDefaultAccount()
            const [balance, assetResponse] = await Promise.all([
                reach.stdlib.balanceOf(account),
                fetch(endpoints.accountTerracells(account.networkAccount.addr))
            ])
            const { assets } = await assetResponse.json()

            user.update({
                walletAccount: account,
                walletBalance: reach.stdlib.formatCurrency(balance, 4),
                terracells: assets
            })

            setLoading(false)
            onClose()
        } catch (e) {
            setLoading(false)
            setError(strings.errorConnectingWallet)
            return
        }
    }

    async function statelessAuthenticate() {
        const account = await reach.stdlib.getDefaultAccount()
        const wallet = account.networkAccount.addr
        const algosdk = reach.stdlib.algosdk
        // const algoProvider = await reach.stdlib.getProvider() // issue: signTxns postTxns does not expose

        const enc = new TextEncoder()
        const notePlainText = `${getWalletNoteUrl()} ${Date.now() + 86400000}`
        const note = enc.encode(notePlainText)
        const authTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
                fee: 0,
                firstRound: 10,
                flatFee: true,
                genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
                genesisID: 'testnet-v1.0',
                lastRound: 10
            },
            from: wallet,
            to: wallet,
            amount: 0,
            note
        })
        const txn = Buffer.from(algosdk.encodeUnsignedTransaction(authTransaction)).toString('base64')
        const txnToSign = [
            {
                txn: txn,
                message: 'This transaction is free and for authentication purposes.'
            }
        ]

        const signedTxns = await window.algorand.signTxns(txnToSign) //ARCs14
        const token = Array.isArray(signedTxns[0]) ? Buffer.from(signedTxns[0]).toString('base64') : signedTxns[0]
        user.setToken({ token })
    }

    useEffect(() => {
        if (visible) setError()
    }, [visible])

    const showLoading = loading || reach.loading

    return (
        <ModalDialog visible={visible} title={strings.connectWallet} onClose={onClose}>
            <div className={styles.container}>
                {showLoading && (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                    </div>
                )}
                {!showLoading && (
                    <ul>
                        <li onClick={connectMyAlgoWallet}>
                            <MyAlgoWallet />
                            <div className={styles.text}>{strings.myAlgoWallet}</div>
                        </li>
                        <li onClick={connectPeraWallet}>
                            <PeraWallet />
                            <div className={styles.text}>{strings.peraWallet}</div>
                        </li>
                        <li className={styles.disabled}>
                            <AlgoSignerWallet />
                            <div className={styles.text}>
                                {strings.algoSigner} - {strings.comingSoon}
                            </div>
                        </li>
                    </ul>
                )}
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </ModalDialog>
    )
}

WalletPicker.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
}

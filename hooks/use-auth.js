import { ReachContext } from 'context/reach-context.js'
import AuthMessageError from 'errors/auth-message.error.js'
import SignAuthError from 'errors/sign-auth.error.js'
import { useContext } from 'react'
import { endpoints } from 'utils/api-config.js'

export function useAuth() {
    const reach = useContext(ReachContext)

    async function getAuthHeader(walletAddress) {
        const response = await fetch(endpoints.authForWallet(walletAddress))
        if (!response.ok) {
            throw new AuthMessageError()
        }
        const authMessage = await response.json()

        const notePlainText = `arc14${Buffer.from(JSON.stringify(authMessage)).toString('base64')}`
        const note = new TextEncoder().encode(notePlainText)

        try {
            const algosdk = reach.stdlib.algosdk
            const authTransaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                suggestedParams: {
                    fee: 0,
                    firstRound: 1,
                    lastRound: 1,
                    flatFee: true,
                    genesisHash: 'ac6f6941b2bc3a3ef85dd19fcae16d2d1e6371faadd1ecf2feccc2907b69aa4c',
                    genesisID: 'arc14-auth'
                },
                from: walletAddress,
                to: walletAddress,
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

            const signedTxns = await window.algorand.signTxns(txnToSign)

            const base64SignedTxn = Array.isArray(signedTxns[0])
                ? Buffer.from(signedTxns[0]).toString('base64')
                : signedTxns[0]

            const identity = {
                account: walletAddress,
                authentication: base64SignedTxn
            }

            const token = Buffer.from(JSON.stringify(identity)).toString('base64')
            return `Bearer ${token}`
        } catch (e) {
            throw new SignAuthError()
        }
    }

    return { getAuthHeader }
}

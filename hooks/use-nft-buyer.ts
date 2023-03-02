import { useContext, useCallback } from 'react'
import { endpoints } from 'utils/api-config.js'
import { ReachContext, ReachStdlib } from '../context/reach-context'
import { UserContext } from '../context/user-context'
import { useAuth } from './use-auth.js'
import { User } from './use-user.js'

export function useNftBuyer() {
    const { nftContractBackend } = useContext<ReachStdlib>(ReachContext)
    const { walletAccount, walletAddress } = useContext<User>(UserContext)
    const { getAuthHeader } = useAuth()

    const buy = useCallback(
        async (
            assetId: string,
            assetContractId: string,
            projectContractId: string,
            positionX: number,
            positionY: number
        ) => {
            const authHeader = await getAuthHeader(walletAddress)
            const purchaseAuthResponse = await fetch(endpoints.nftPurchaseAuth(assetId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    projectId: projectContractId,
                    positionX,
                    positionY
                })
            })

            if (purchaseAuthResponse.status !== 201) {
                throw Error('Unable to get purchase token')
            }

            const { purchaseAuthToken } = await purchaseAuthResponse.json()

            if (!purchaseAuthToken || !walletAccount) {
                throw Error('Unable to proceed to purchase')
            }

            const infoObject = JSON.parse(Buffer.from(assetContractId, 'base64').toString())
            const contract = walletAccount.contract(nftContractBackend, infoObject)
            const tokenId = (await contract.v.View.token())[1].toNumber()
            await walletAccount.tokenAccept(tokenId)
            await contract.a.Market.buy()

            await fetch(endpoints.nftPurchase(assetId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ purchaseAuthToken })
            })
        },
        [getAuthHeader, nftContractBackend, walletAccount, walletAddress]
    )

    return { buy }
}

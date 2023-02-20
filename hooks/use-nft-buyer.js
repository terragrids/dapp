import { useContext, useCallback } from 'react'
import { ReachContext } from '../context/reach-context.ts'
import { UserContext } from '../context/user-context'

export function useNftBuyer() {
    const { nftContractBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const buy = useCallback(
        async contractInfo => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                const contract = walletAccount.contract(nftContractBackend, infoObject)
                const tokenId = (await contract.v.View.token())[1].toNumber()
                await walletAccount.tokenAccept(tokenId)
                await contract.a.Market.buy()
            }
        },
        [nftContractBackend, walletAccount]
    )

    return { buy }
}

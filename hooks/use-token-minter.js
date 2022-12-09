import { ReachContext } from 'context/reach-context.ts'
import { UserContext } from 'context/user-context.js'
import { useContext } from 'react'
import { algorandAddressFromCID, cidFromAlgorandAddress } from 'utils/token-utils.js'

export function useTokenMinter() {
    const { stdlib } = useContext(ReachContext)
    const { walletAccount, walletAddress } = useContext(UserContext)

    async function mint({ name, symbol, cid }) {
        const { address, url } = algorandAddressFromCID(stdlib.algosdk, cid)
        const cidFromAddress = cidFromAlgorandAddress(stdlib.algosdk, address)
        if (cid !== cidFromAddress) return false

        try {
            const launchTokenResponse = await stdlib.launchToken(walletAccount, name, symbol, {
                supply: 1,
                decimals: 0,
                url,
                reserve: address,
                manager: walletAddress
            })
            return launchTokenResponse.id.toNumber()
        } catch (e) {
            return false
        }
    }

    return { mint }
}

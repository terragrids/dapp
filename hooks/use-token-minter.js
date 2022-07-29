import { ReachContext } from 'context/reach-context.js'
import { UserContext } from 'context/user-context.js'
import { useContext } from 'react'

export function useTokenMinter() {
    const { stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    async function mint({ name, symbol, url, metadataHash }) {
        try {
            await stdlib.launchToken(walletAccount, name, symbol, {
                supply: 1,
                decimals: 0,
                url,
                metadataHash
            })
            return true
        } catch (e) { return false }
    }

    return { mint }
}

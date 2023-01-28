import { UserContext } from 'context/user-context.js'
import { useContext } from 'react'
import { User } from 'hooks/use-user'
import { useAuth } from './use-auth.js'
import { endpoints } from 'utils/api-config.js'

export function useTokenMinter() {
    const user = useContext<User>(UserContext)
    const { getAuthHeader } = useAuth()

    /**
     * Mints an NFT on the blockchain and creates a contract to sell it
     */
    async function mint(symbol: string, name: string, cid: string, price: number, offChainImageUrl: string) {
        try {
            const authHeader = await getAuthHeader(user.walletAddress)
            const response = await fetch(endpoints.nfts, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    symbol,
                    name,
                    cid,
                    price,
                    offChainImageUrl
                })
            })

            if (response.status !== 201) {
                return null
            } else {
                const { contractId, tokenId } = await response.json()
                return { contractId, tokenId }
            }
        } catch (e) {
            return null
        }
    }

    return { mint }
}

import { ReachContext } from 'context/reach-context.js'
import { UserContext } from 'context/user-context.js'
import { useContext } from 'react'
import { endpoints } from 'utils/api-config.js'

export function useTokenMinter() {
    const { stdlib, sppBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    async function mint({ name, symbol, url, metadataHash }) {
        const hashBuffer = Buffer.from(metadataHash, 'base64')
        const hashArray = new Uint8Array(hashBuffer)
        try {
            const launchTokenResponse = await stdlib.launchToken(walletAccount, name, symbol, {
                supply: 1,
                decimals: 0,
                url,
                metadataHash: hashArray
            })

            // Deploy the SPP contract if it's not done yet
            const response = await fetch(endpoints.solarPowerPlant)
            if (response.status === 200) {
                const { contractInfo } = await response.json()
                if (!contractInfo) {
                    try {
                        const sppContract = walletAccount.contract(sppBackend)
                        sppContract.p.Admin({
                            log: () => {
                                /* add logs */
                            },
                            onReady: async contract => {
                                try {
                                    await fetch(endpoints.solarPowerPlant, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        referrerPolicy: 'no-referrer',
                                        body: JSON.stringify({
                                            contractInfo: Buffer.from(JSON.stringify(contract)).toString('base64')
                                        })
                                    })
                                } catch (e) {}
                            }
                        })
                    } catch (e) {}
                }
            }

            return launchTokenResponse.id.toNumber()
        } catch (e) {
            return false
        }
    }

    return { mint }
}

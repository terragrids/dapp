import { useContext, useCallback } from 'react'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useSppUpdater() {
    const { sppBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const setSppCapacity = useCallback(
        async (contractInfo, capacity) => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                const sppContract = walletAccount.contract(sppBackend, infoObject)
                await sppContract.a.SolarPowerPlant.setCapacity(capacity)
            }
        },
        [sppBackend, walletAccount]
    )

    return { setSppCapacity }
}

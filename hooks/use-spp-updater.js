import { useContext, useCallback } from 'react'
import { getContractFromJsonString } from 'utils/string-utils.js'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useSppUpdater() {
    const { sppBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const setSppCapacity = useCallback(
        async (contractInfo, capacity) => {
            if (contractInfo && walletAccount) {
                const infoObject = getContractFromJsonString(contractInfo)
                const sppContract = walletAccount.contract(sppBackend, infoObject)
                await sppContract.a.SolarPowerPlant.setCapacity(capacity)
            }
        },
        [sppBackend, walletAccount]
    )

    return { setSppCapacity }
}

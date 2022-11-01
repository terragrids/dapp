import { useContext, useCallback } from 'react'
import { getContractFromJsonString } from 'utils/string-utils.js'
import { ReachContext } from '../context/reach-context.ts'
import { UserContext } from '../context/user-context'

export function useSppUpdater() {
    const { sppBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const setSpp = useCallback(
        async (contractInfo, capacity, output, totalTerracells, activeTerracells) => {
            if (contractInfo && walletAccount) {
                const infoObject = getContractFromJsonString(contractInfo)
                const sppContract = walletAccount.contract(sppBackend, infoObject)
                await sppContract.a.SolarPowerPlant.set(capacity, output, totalTerracells, activeTerracells)
            }
        },
        [sppBackend, walletAccount]
    )

    return { setSpp }
}

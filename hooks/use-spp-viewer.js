import { useContext, useCallback } from 'react'
import { getContractFromJsonString } from 'utils/string-utils.js'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useSppViewer() {
    const { sppBackend, stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const getSpp = useCallback(
        async contractInfo => {
            if (contractInfo && walletAccount) {
                const infoObject = getContractFromJsonString(contractInfo)
                const sppContract = walletAccount.contract(sppBackend, infoObject)

                const contractId = stdlib.bigNumberToNumber(infoObject)
                const capacity = (await sppContract.v.SPPView.capacity())[1].toNumber()
                const output = (await sppContract.v.SPPView.output())[1].toNumber()
                const total = (await sppContract.v.SPPView.total())[1].toNumber()
                const active = (await sppContract.v.SPPView.active())[1].toNumber()

                return { contractId, capacity, output, total, active }
            }
        },
        [sppBackend, stdlib, walletAccount]
    )

    return { getSpp }
}

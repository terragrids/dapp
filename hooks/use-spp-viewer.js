import { useContext, useCallback } from 'react'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useSppViewer() {
    const { sppBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const getSpp = useCallback(
        async contractInfo => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                const sppContract = walletAccount.contract(sppBackend, infoObject)

                const capacity = (await sppContract.v.SPPView.capacity())[1].toNumber()
                const output = (await sppContract.v.SPPView.output())[1].toNumber()

                return { capacity, output }
            }
        },
        [sppBackend, walletAccount]
    )

    return { getSpp }
}

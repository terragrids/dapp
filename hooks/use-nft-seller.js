import { useContext, useRef, useCallback } from 'react'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'
import { formatAlgoContractInfo } from '../utils/string-utils'

export function useNftSeller() {
    const { backend, stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)
    const contract = useRef()

    const sell = useCallback(async (tokenId, onReady) => {
        if (contract.current) return
        contract.current = walletAccount.contract(backend)
        await contract.current.p.Admin({
            log: (() => { }),
            onReady: async (contract) => {
                onReady({ info: JSON.stringify(contract, null, 2) })
            },
            tok: tokenId,
            price: stdlib.parseCurrency(10)
        })
    }, [backend, stdlib, walletAccount])

    const withdraw = useCallback(async (appId) => {
        if (contract.current) {
            contract.current.a.Market.stop()
        }
        else if (appId && walletAccount) {
            const contractInfo = formatAlgoContractInfo(appId)
            contract.current = walletAccount.contract(backend, contractInfo)
        }
    }, [backend, walletAccount])

    return { sell, withdraw }
}
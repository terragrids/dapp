import { useContext, useRef, useCallback } from 'react'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'
import { formatAlgoContractInfo } from '../utils/string-utils'

export function useNftSeller() {
    const { backend, stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)
    const contract = useRef()
    const price = 10

    const sell = useCallback(async (tokenId, onReady) => {
        if (contract.current) return
        contract.current = walletAccount.contract(backend)
        await contract.current.p.Admin({
            log: (() => { }),
            onReady: async (contract) => {
                onReady({
                    id: contract.toNumber(),
                    info: Buffer.from(JSON.stringify(contract)).toString('base64')
                })
            },
            tok: tokenId,
            price: stdlib.parseCurrency(price)
        })
    }, [backend, stdlib, walletAccount])

    const withdraw = useCallback(async (appId) => {
        if (appId && walletAccount) {
            const contractInfo = formatAlgoContractInfo(appId)
            contract.current = walletAccount.contract(backend, contractInfo)
            contract.current.a.Market.stop()
        }
    }, [backend, walletAccount])

    return { sell, withdraw, price, unit: 'ALGO' }
}
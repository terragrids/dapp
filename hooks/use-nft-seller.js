import { useContext, useRef, useCallback } from 'react'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useNftSeller() {
    const { backend, stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)
    const contract = useRef()

    const sell = useCallback(async (tokenId, onReady) => {
        if (contract.current) return
        contract.current = walletAccount.contract(backend)
        await contract.current.p.Admin({
            onReady: async (contract) => {
                onReady({ info: JSON.stringify(contract, null, 2) })
            },
            tok: tokenId,
            price: stdlib.parseCurrency(10)
        })
    }, [backend, stdlib, walletAccount])

    const withdraw = useCallback(async () => {
        contract.current && contract.current.a.stop()
    }, [])

    return { sell, withdraw }
}
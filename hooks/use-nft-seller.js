import { useContext, useRef, useCallback } from 'react'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useNftSeller() {
    const { backend, stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)
    const contract = useRef()
    const price = 10

    const sell = useCallback(async (tokenId, onReady) => {
        if (contract.current) return
        contract.current = walletAccount.contract(backend)
        try {
            await contract.current.p.Admin({
                log: (() => { /* add logs */ }),
                onReady: async (contract) => {
                    onReady({
                        id: contract.toNumber(),
                        info: Buffer.from(JSON.stringify(contract)).toString('base64')
                    })
                },
                tok: tokenId,
                price: stdlib.parseCurrency(price)
            })
        } finally {
            contract.current = null
        }
    }, [backend, stdlib, walletAccount])

    const buy = useCallback(async (contractInfo) => {
        if (contractInfo && walletAccount) {
            const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
            contract.current = walletAccount.contract(backend, infoObject)
            const token = await contract.current.a.Market.getToken()
            await walletAccount.tokenAccept(token.toNumber())
            await contract.current.a.Market.buy()
            contract.current = null
        }
    }, [backend, walletAccount])

    const withdraw = useCallback(async (contractInfo) => {
        if (contractInfo && walletAccount) {
            const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
            contract.current = walletAccount.contract(backend, infoObject)
            await contract.current.a.Market.stop()
            contract.current = null
        }
    }, [backend, walletAccount])

    return { sell, buy, withdraw, price, unit: 'ALGO' }
}
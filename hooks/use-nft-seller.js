import { useContext, useRef, useCallback } from 'react'
import { endpoints } from 'utils/api-config.js'
import { createPromise } from 'utils/promise'
import { ReachContext } from '../context/reach-context.ts'
import { UserContext } from '../context/user-context'

export function useNftSeller() {
    const { tokenMarketBackend, stdlib } = useContext(ReachContext)
    const { walletAccount, walletAddress } = useContext(UserContext)
    const tokenMarketContract = useRef()
    const unit = 'ALGO'

    const saveContractInfo = useCallback(
        async ({ tokenId, applicationId, contractInfo, price }) => {
            // TODO Move this logic to a backend service worker to ensure security and consistency.
            // Issues with this approach:
            // 1. Bad actors could call this unprotected endpoint and associate a terracell with a random application (this could be solved protecting the API with authentication / authorization)
            // 2. All request retries could fail, leaving the system in an inconsistent state, where a terracell is owned by a contract but the contract is not stored and associated with the terracell in the offchain db (this could be solved by running consistency checks in backend service workers)

            let retries = 30
            const { promise, succeed, fail } = createPromise()

            async function postContract() {
                const response = await fetch(endpoints.nftContract(tokenId, applicationId), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        contractInfo,
                        sellerAddress: walletAddress,
                        assetPrice: price,
                        assetPriceUnit: unit
                    })
                })

                // TODO decide what to do with contract verification
                // const { contractVerified } = await response.json()

                if (response.status === 201) {
                    succeed({ applicationId, contractInfo })
                } else if (retries > 0) {
                    retries--
                    setTimeout(postContract, 1000)
                } else {
                    // If we end up here, we are in an inconsistent state where this terracell is owned by a new contract,
                    // but the contract info is not stored and associated with the terracell in the offchain db.
                    fail()
                }
            }
            postContract()
            return promise
        },
        [walletAddress]
    )

    const deleteContractInfo = useCallback(async ({ tokenId, applicationId }) => {
        // TODO Move this logic to a backend service worker.
        let retries = 30
        const { promise, succeed, fail } = createPromise()

        async function deleteContract() {
            const response = await fetch(endpoints.nftContract(tokenId, applicationId), {
                method: 'DELETE',
                referrerPolicy: 'no-referrer'
            })

            if (response.status === 204) {
                succeed()
            } else if (retries > 0) {
                retries--
                setTimeout(deleteContract, 1000)
            } else {
                // If we end up here, we are in an inconsistent state where this terracell is owned by the seller,
                // but the contract info is still stored and associated with the terracell in the offchain db.
                fail()
            }
        }

        deleteContract()
        return promise
    }, [])

    const sell = useCallback(
        async ({ tokenId, price, sppContractInfo, power = 0 }) => {
            const { promise, succeed, fail } = createPromise()

            try {
                tokenMarketContract.current = walletAccount.contract(tokenMarketBackend)
                tokenMarketContract.current.p.Admin({
                    log: () => {
                        /* add logs */
                    },
                    onReady: async contract => {
                        try {
                            const result = await saveContractInfo({
                                tokenId,
                                applicationId: contract.toNumber(),
                                contractInfo: Buffer.from(JSON.stringify(contract)).toString('base64'),
                                price
                            })
                            succeed(result)
                        } catch (e) {
                            fail()
                        }
                    },
                    onSoldOrWithdrawn: async () => {
                        // do nothing
                    },
                    tok: tokenId,
                    price: stdlib.parseCurrency(price),
                    power,
                    sppContractInfo: JSON.parse(Buffer.from(sppContractInfo, 'base64'))
                })
            } catch (e) {
                fail(e)
            } finally {
                tokenMarketContract.current = null
            }
            return promise
        },
        [tokenMarketBackend, saveContractInfo, stdlib, walletAccount]
    )

    const buy = useCallback(
        async contractInfo => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                tokenMarketContract.current = walletAccount.contract(tokenMarketBackend, infoObject)
                const token = await tokenMarketContract.current.a.Market.getToken()
                await walletAccount.tokenAccept(token.toNumber())
                await tokenMarketContract.current.a.Market.buy()
                tokenMarketContract.current = null
            }
        },
        [tokenMarketBackend, walletAccount]
    )

    const withdraw = useCallback(
        async (tokenId, applicationId, contractInfo) => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                tokenMarketContract.current = walletAccount.contract(tokenMarketBackend, infoObject)
                try {
                    // If the NFT is still up for sale, we stop the market
                    await tokenMarketContract.current.a.Market.stop()
                } catch (e) {
                    // If the NFT is already sold, we stop the tracker
                    await tokenMarketContract.current.a.Tracker.stop()
                }
                tokenMarketContract.current = null
                await deleteContractInfo({ tokenId, applicationId })
            }
        },
        [tokenMarketBackend, deleteContractInfo, walletAccount]
    )

    return { sell, buy, withdraw, unit }
}

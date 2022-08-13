import { useContext, useRef, useCallback } from 'react'
import { endpoints } from 'utils/api-config.js'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useNftSeller() {
    const { backend, stdlib } = useContext(ReachContext)
    const { walletAccount, walletAddress } = useContext(UserContext)
    const contract = useRef()
    const unit = 'ALGO'

    const saveContractInfo = useCallback(
        async ({ tokenId, applicationId, contractInfo, price }) => {
            // TODO Move this logic to a backend service worker to ensure security and consistency.
            // Issues with this approach:
            // 1. Bad actors could call this unprotected endpoint and associate a terracell with a random application (this could be solved protecting the API with authentication / authorization)
            // 2. All request retries could fail, leaving the system in an inconsistent state, where a terracell is owned by a contract but the contract is not stored and associated with the terracell in the offchain db (this could be solved by running consistency checks in backend service workers)

            let retries = 30
            let succeed, fail

            var promise = new Promise(function (resolve, reject) {
                succeed = resolve
                fail = reject
            })

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

                const { contractVerified } = await response.json()

                if (response.status === 201 && contractVerified) {
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
        let succeed, fail

        var promise = new Promise(function (resolve, reject) {
            succeed = resolve
            fail = reject
        })

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
        async ({ tokenId, price }) => {
            let succeed, fail
            var promise = new Promise(function (resolve, reject) {
                succeed = resolve
                fail = reject
            })

            try {
                contract.current = walletAccount.contract(backend)
                contract.current.p.Admin({
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
                    price: stdlib.parseCurrency(price)
                })
            } catch (e) {
                fail()
            } finally {
                contract.current = null
            }
            return promise
        },
        [backend, saveContractInfo, stdlib, walletAccount]
    )

    const buy = useCallback(
        async contractInfo => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                contract.current = walletAccount.contract(backend, infoObject)
                const token = await contract.current.a.Market.getToken()
                await walletAccount.tokenAccept(token.toNumber())
                await contract.current.a.Market.buy()
                contract.current = null
            }
        },
        [backend, walletAccount]
    )

    const withdraw = useCallback(
        async (tokenId, applicationId, contractInfo) => {
            if (contractInfo && walletAccount) {
                const infoObject = JSON.parse(Buffer.from(contractInfo, 'base64'))
                contract.current = walletAccount.contract(backend, infoObject)
                try {
                    // If the NFT is still up for sale, we stop the market
                    await contract.current.a.Market.stop()
                } catch (e) {
                    // If the NFT is already sold, we stop the tracker
                    await contract.current.a.Tracker.stop()
                }
                contract.current = null
                await deleteContractInfo({ tokenId, applicationId })
            }
        },
        [backend, deleteContractInfo, walletAccount]
    )

    return { sell, buy, withdraw, unit }
}

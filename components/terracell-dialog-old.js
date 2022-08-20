/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react'
import { useNftSeller } from '../hooks/use-nft-seller'
import { endpoints, ipfsUrl } from '../utils/api-config'
import { strings } from '../strings/en'
import Button from './button'
import LoadingSpinner from './loading-spinner'
import ModalDialog from './modal-dialog'
import styles from './terracell-dialog.module.scss'
import { UserContext } from '../context/user-context'
import { getIpfsHash } from 'utils/string-utils.js'

export default function TerracellDialog({
    id,
    visible,
    onClose,
    onUpForSale,
    onPurchased,
    onWithdrawn,
    isAuthenticated,
    canSell
}) {
    const [terracell, setTerracell] = useState()
    const [nftImageUrl, setNftImageUrl] = useState()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const user = useContext(UserContext)
    const { sell, buy, withdraw, price, unit } = useNftSeller()

    useEffect(() => {
        async function fetchTerracell() {
            setNftImageUrl()
            const terracell = await fetch(endpoints.terracell(id))
            const { asset } = await terracell.json()
            setTerracell(asset)

            const ipfsMetadataHash = getIpfsHash(asset.url)

            if (ipfsMetadataHash) {
                const metadata = await fetch(ipfsUrl(ipfsMetadataHash))
                const { image } = await metadata.json()
                const ipfsFileHash = getIpfsHash(image)
                setNftImageUrl(ipfsUrl(ipfsFileHash))
            }
        }
        if (id) {
            setErrorMessage()
            setLoading()
            setTerracell()
            fetchTerracell()
        }
    }, [id])

    async function sellTerracell() {
        setLoading(true)
        setErrorMessage()

        try {
            await sell({
                tokenId: id,
                price: 10,
                onReady: onReadyToSell
            })
        } catch (e) {
            setErrorMessage(strings.errorCreatingTerracellSaleContract)
            setLoading(false)
            return
        }
    }

    async function onReadyToSell({ id, info }) {
        setTerracell(trcl => ({
            ...trcl,
            contract: {
                id,
                info,
                sellerAddress: user.walletAddress,
                assetPrice: price,
                assetPriceUnit: unit
            }
        }))

        // TODO Move this logic to a backend service worker to ensure security and consistency.
        // Issues with this approach:
        // 1. Bad actors could call this unprotected endpoint and associate a terracell with a random application (this could be solved protecting the API with authentication / authorization)
        // 2. All request retries could fail, leaving the system in an inconsistent state, where a terracell is owned by a contract but the contract is not stored and associated with the terracell in the offchain db (this could be solved by running consistency checks in backend service workers)

        let retries = 30
        async function postContract() {
            const response = await fetch(endpoints.terracellContract(terracell.id, id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    contractInfo: info,
                    sellerAddress: user.walletAddress,
                    assetPrice: price,
                    assetPriceUnit: unit
                })
            })

            const { contractVerified } = await response.json()

            if (response.status === 201 && contractVerified) {
                setLoading(false)
                onUpForSale(terracell.id)
            } else if (retries > 0) {
                retries--
                setTimeout(postContract, 1000)
            } else {
                // If we end up here, we are in an inconsistent state where this terracell is owned by a new contract,
                // but the contract info is not stored and associated with the terracell in the offchain db.
                setErrorMessage(strings.errorCreatingTerracellSaleContract)
                setLoading(false)
            }
        }
        postContract()
    }

    async function withdrawTerracell() {
        setLoading(true)
        setErrorMessage()

        try {
            await withdraw(terracell.contract.info)
        } catch (e) {
            setLoading(false)
            setErrorMessage(strings.errorDeletingTerracellSaleContract)
            return
        }

        setTerracell(trcl => ({
            ...trcl,
            contract: null
        }))

        // TODO Move this logic to a backend service worker.
        let retries = 30
        async function deleteContract() {
            const response = await fetch(endpoints.terracellContract(terracell.id, terracell.contract.id), {
                method: 'DELETE',
                referrerPolicy: 'no-referrer'
            })

            if (response.status === 204) {
                setTerracell(trcl => ({ ...trcl, contract: null }))
                setLoading(false)
                onWithdrawn(terracell.id)
            } else if (retries > 0) {
                retries--
                setTimeout(deleteContract, 1000)
            } else {
                // If we end up here, we are in an inconsistent state where this terracell is owned by the seller,
                // but the contract info is still stored and associated with the terracell in the offchain db.
                setLoading(false)
                setErrorMessage(strings.errorDeletingTerracellSaleContract)
            }
        }
        deleteContract()
    }

    async function buyTerracell() {
        setLoading(true)
        setErrorMessage()

        try {
            await buy(terracell.contract.info)
        } catch (e) {
            setErrorMessage(strings.transactionFailed)
            setLoading(false)
            return
        }

        // TODO Move this logic to a backend service worker.
        let retries = 30
        async function deleteContract() {
            const response = await fetch(endpoints.terracellContract(terracell.id, terracell.contract.id), {
                method: 'DELETE',
                referrerPolicy: 'no-referrer'
            })

            if (response.status === 204) {
                setTerracell(trcl => ({ ...trcl, contract: null }))
                setLoading(false)
                onPurchased(terracell.id)
            } else if (retries > 0) {
                retries--
                setTimeout(deleteContract, 1000)
            } else {
                // If we end up here, we are in an inconsistent state where this terracell is owned by the seller,
                // but the contract info is still stored and associated with the terracell in the offchain db.
                setLoading(false)
                setErrorMessage(strings.errorDeletingTerracellSaleContract)
            }
        }
        deleteContract()
    }

    return (
        <ModalDialog visible={visible} title={'Terracell'} onClose={onClose}>
            <div className={styles.container}>
                {!terracell && <LoadingSpinner />}
                {terracell && (
                    <>
                        <div className={styles.message}>{terracell.name}</div>
                        <pre className={styles.info}>{`id: ${terracell.id}`}</pre>

                        {/* TODO: replace with Image */}
                        {nftImageUrl && (
                            <div className={styles.image}>
                                <picture>
                                    <source srcSet={nftImageUrl} type={'image/*'} />
                                    <img src={nftImageUrl} alt={'image'} />
                                </picture>
                            </div>
                        )}

                        {terracell.contract && (
                            <div className={styles.contract}>
                                <header>{strings.terracellOnTheMarket}</header>
                                <div className={styles.infoOld}>
                                    <pre>{strings.contractId}</pre>
                                    <pre>{terracell.contract.id}</pre>
                                </div>
                            </div>
                        )}
                        {canSell && !terracell.contract && (
                            <div className={styles.action}>
                                <Button loading={loading} label={strings.sell} onClick={sellTerracell} />
                            </div>
                        )}
                        {isAuthenticated &&
                            terracell.contract &&
                            terracell.contract.info &&
                            terracell.contract.sellerAddress === user.walletAddress && (
                                <div className={styles.action}>
                                    <Button loading={loading} label={strings.withdraw} onClick={withdrawTerracell} />
                                </div>
                            )}
                        {isAuthenticated &&
                            terracell.contract &&
                            terracell.contract.info &&
                            terracell.contract.sellerAddress !== user.walletAddress && (
                                <div className={styles.action}>
                                    <Button loading={loading} label={strings.buy} onClick={buyTerracell} />
                                </div>
                            )}
                        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                    </>
                )}
            </div>
        </ModalDialog>
    )
}

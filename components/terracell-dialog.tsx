/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react'
import { useNftSeller } from 'hooks/use-nft-seller'
import { endpoints, ipfsUrl } from 'utils/api-config'
import { strings } from 'strings/en'
import Button from './button'
import LoadingSpinner from './loading-spinner'
import ModalDialog from './modal-dialog'
import styles from './terracell-dialog.module.scss'
import { UserContext } from 'context/user-context'
import { getIpfsHash } from 'utils/string-utils.js'
import { User, UserCapabilities } from 'hooks/use-user'
import { Terracell } from 'types/nft'
import { removeSuffix, TRDL_SUFFIX } from 'components/map/plots/plot-helpers'
import NftInfo from './nft-info'

type TerracellDialogProps = {
    id: string | undefined
    visible: boolean
    onClose: () => void
}

/**
 * TODO:
 * - check if functions (onSell, onWithdraw, and onBuy) are correct as they are just copied from plot-info-dialog.tsx
 * - add animation or transition property to opening full description if necessary
 */

export default function TerracellDialog({ id, visible, onClose }: TerracellDialogProps) {
    const [terracell, setTerracell] = useState<Terracell | null>()
    const [nftImageUrl, setNftImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const user = useContext<User>(UserContext)
    const [userCapability, setUserCapability] = useState<UserCapabilities | null>()

    const { sell, buy, withdraw, unit } = useNftSeller()

    useEffect(() => {
        async function fetchTerracell() {
            setNftImageUrl('')
            const terracell = await fetch(endpoints.terracell(id))
            const { asset } = await terracell.json()

            // TODO: checkt power is in contract in production
            setTerracell({ ...asset, power: asset.contract.power, name: removeSuffix(asset.name, TRDL_SUFFIX) })

            const ipfsMetadataHash = getIpfsHash(asset.url)

            if (ipfsMetadataHash) {
                const metadata = await fetch(ipfsUrl(ipfsMetadataHash))
                const { image } = await metadata.json()
                const ipfsFileHash = getIpfsHash(image)
                setNftImageUrl(ipfsUrl(ipfsFileHash))
            }
        }
        if (id) {
            setError('')
            setLoading(false)
            setTerracell(null)
            fetchTerracell()
        }
    }, [id])

    useEffect(() => {
        if (user && user.authenticated && terracell) {
            const owned = terracell.holders.some(holder => holder.address === user.walletAddress)
            const onSale = !!terracell.contractId
            const isSeller = terracell.sellerAddress === user.walletAddress

            if (owned && !onSale) setUserCapability(UserCapabilities.CAN_SELL)
            else if (isSeller && onSale) setUserCapability(UserCapabilities.CAN_WITHDRAW)
            else if (!owned && !isSeller && onSale) setUserCapability(UserCapabilities.CAN_BUY)
            else setUserCapability(null)
        }
    }, [terracell, user])

    async function onSell() {
        if (!terracell) return

        setLoading(true)
        setError(null)

        try {
            const { applicationId, contractInfo } = await sell({
                tokenId: terracell.id,
                price: terracell.assetPrice
            })
            setTerracell({ ...terracell, contractId: applicationId, contractInfo })
            onClose()
        } catch (e) {
            setError(strings.errorCreatingNftSaleContract)
            return
        } finally {
            setLoading(false)
        }
    }

    async function onWithdraw() {
        if (!terracell) return

        setLoading(true)
        setError('')

        try {
            await withdraw(terracell.id, terracell.contractId, terracell.contractInfo)
            setTerracell({ ...terracell, contractId: undefined, contractInfo: undefined })
            onClose()
        } catch (e) {
            setError(strings.errorDeletingNftSaleContract)
        } finally {
            setLoading(false)
        }
    }

    async function onBuy() {
        if (!terracell) return

        setLoading(true)
        setError(null)

        try {
            await buy(terracell.contractInfo)
            setTerracell({ ...terracell, contractId: undefined, contractInfo: undefined })
            onClose()
        } catch (e) {
            setError(strings.errorBuyingNft)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModalDialog
            visible={visible}
            title={strings.terracellInformation}
            subtitle={terracell?.name || ''}
            onClose={onClose}>
            <div className={styles.container}>
                {!terracell && <LoadingSpinner />}
                {terracell && (
                    <>
                        {/* TODO: replace with Image */}
                        {nftImageUrl && (
                            <div className={styles.image}>
                                <picture>
                                    <source srcSet={nftImageUrl} type={'image/*'} />
                                    <img src={nftImageUrl} alt={'image'} />
                                </picture>
                            </div>
                        )}

                        <div className={styles.info}>
                            <NftInfo data={terracell} />
                        </div>
                        {error && <div className={styles.error}>{error}</div>}

                        {userCapability !== null && (
                            <div className={styles.buttonWrapper}>
                                {userCapability === UserCapabilities.CAN_SELL && terracell && (
                                    <Button
                                        type={'outline'}
                                        className={styles.button}
                                        label={`${strings.sellFor} ${terracell.assetPrice || 0} $${unit}`}
                                        loading={loading}
                                        onClick={onSell}
                                    />
                                )}

                                {userCapability === UserCapabilities.CAN_WITHDRAW && terracell && (
                                    <Button
                                        type={'outline'}
                                        className={styles.button}
                                        label={strings.withdraw}
                                        loading={loading}
                                        onClick={onWithdraw}
                                    />
                                )}

                                {userCapability === UserCapabilities.CAN_BUY && terracell && (
                                    <Button
                                        className={styles.button}
                                        type={'outline'}
                                        label={`${strings.buyFor} ${terracell.assetPrice || 0} $${unit}`}
                                        loading={loading}
                                        onClick={onBuy}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </ModalDialog>
    )
}

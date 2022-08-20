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
import { getIpfsHash, maskWalletAddress, truncate } from 'utils/string-utils.js'
import { User, UserCapabilities } from 'hooks/use-user'
import { Terracell } from 'types/nft'
import { removeSuffix, TRDL_SUFFIX } from 'components/map/plots/plot-helpers'

type TerracellDialogProps = {
    id: string | undefined
    visible: boolean
    onClose: () => void
}

const MAX_CHARS_TO_DISPLAY = 15

export default function TerracellDialog({ id, visible, onClose }: TerracellDialogProps) {
    const [terracell, setTerracell] = useState<Terracell | null>()
    const [nftImageUrl, setNftImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const user = useContext<User>(UserContext)
    const [userCapability, setUserCapability] = useState<UserCapabilities | null>()
    const [terracellName, setTerracellName] = useState('')

    const { sell, buy, withdraw, unit } = useNftSeller()

    useEffect(() => {
        async function fetchTerracell() {
            setNftImageUrl('')
            const terracell = await fetch(endpoints.terracell(id))
            const { asset } = await terracell.json()

            const terracellName = removeSuffix(asset.name, TRDL_SUFFIX)
            setTerracell({ ...asset, name: terracellName })
            setTerracellName(terracellName)

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
        <ModalDialog visible={visible} title={strings.terracellInformation} subtitle={terracellName} onClose={onClose}>
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
                            <dl className={styles.dList}>
                                <div className={styles.dListItem}>
                                    <dt>{strings.name}</dt>
                                    <dd>{terracell.name}</dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>{strings.description}</dt>
                                    <dd>
                                        {terracell.description
                                            ? truncate(`${terracell.description}`, MAX_CHARS_TO_DISPLAY)
                                            : strings.noDescription}
                                    </dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>{strings.output}</dt>
                                    <dd>{terracell.power || 0} TRW</dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>{strings.assetID}</dt>
                                    <dd>{terracell.id}</dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>{strings.holder}</dt>
                                    <dd>{maskWalletAddress(terracell.holders[0].address)}</dd>
                                </div>

                                {terracell.contractId && (
                                    <div className={styles.dListItem}>
                                        <dt>{strings.contractId}</dt>
                                        <dd>{terracell.contractId}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                        {error && <div className={styles.error}>{error}</div>}

                        {userCapability !== null && (
                            <div>
                                {userCapability === UserCapabilities.CAN_SELL && terracell && (
                                    <Button
                                        type={'outline'}
                                        className={styles.button}
                                        label={`${strings.sellFor} ${terracell.assetPrice} $${unit}`}
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
                                        label={`${strings.buyFor} ${terracell.assetPrice} $${unit}`}
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

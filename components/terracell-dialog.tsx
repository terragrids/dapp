/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react'
import { useNftSeller } from 'hooks/use-nft-seller'
import { endpoints } from 'utils/api-config'
import { strings } from 'strings/en'
import Button from './button'
import LoadingSpinner from './loading-spinner'
import ModalDialog from './modal-dialog'
import styles from './terracell-dialog.module.scss'
import { UserContext } from 'context/user-context'
import { formatTrclName, ipfsUrlToGatewayUrl } from 'utils/string-utils.js'
import { User, UserCapabilities } from 'hooks/use-user'
import { Terracell } from 'types/nft'
import NftInfo from './nft-info'

type TerracellDialogProps = {
    id: string | undefined
    visible: boolean
    onClose: () => void
}

export default function TerracellDialog({ id, visible, onClose }: TerracellDialogProps) {
    const [terracell, setTerracell] = useState<Terracell | null>()
    const [ipfsImageUrl, setIpfsImageUrl] = useState<string | null>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sppContractInfo, setSppContractInfo] = useState<string>()
    const user = useContext<User>(UserContext)
    const [userCapability, setUserCapability] = useState<UserCapabilities | null>()
    const assetPrice = 10

    const { sell, buy, withdraw, unit } = useNftSeller()

    useEffect(() => {
        async function fetchTerracell() {
            const [sppResponse, nftResponse] = await Promise.all([
                fetch(endpoints.solarPowerPlant),
                fetch(endpoints.nft(id))
            ])

            if (sppResponse.ok && nftResponse.ok) {
                const { contractInfo } = await sppResponse.json()
                setSppContractInfo(contractInfo)

                const { asset } = await nftResponse.json()

                setTerracell({ ...asset, name: formatTrclName(asset.name) })

                try {
                    const ipfsResponse = await fetch(ipfsUrlToGatewayUrl(asset.url))

                    if (ipfsResponse.ok) {
                        const { image, description } = await ipfsResponse.json()
                        setIpfsImageUrl(ipfsUrlToGatewayUrl(image))
                        setTerracell(trcl => ({
                            ...(trcl as Terracell),
                            description: description.text as string
                        }))
                    }
                } catch (e) {}
            } else {
                setError(strings.errorFetchingTerraland)
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
                price: terracell.assetPrice || assetPrice,
                power: terracell.power,
                sppContractInfo
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
            subtitle={terracell?.name || null}
            onClose={onClose}>
            <div className={styles.container}>
                {!terracell && <LoadingSpinner />}
                {terracell && (
                    <>
                        {/* TODO: replace with Image */}
                        <div className={styles.image}>
                            <picture>
                                <source srcSet={terracell.offchainUrl} type={'image/*'} />
                                <img src={ipfsImageUrl ? ipfsImageUrl : terracell.offchainUrl} alt={terracell.name} />
                            </picture>
                        </div>

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
                                        label={`${strings.sellFor} ${terracell.assetPrice || assetPrice} $${unit}`}
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
                                        label={`${strings.buyFor} ${terracell.assetPrice || assetPrice} $${unit}`}
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

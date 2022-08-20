/* eslint-disable @next/next/no-img-element */
import ModalDialog from 'components/modal-dialog'
import styles from './plot-info-dialog.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'components/button'
import { strings } from 'strings/en'
import { removeSuffix, TRDL_SUFFIX } from './plot-helpers'
import { endpoints } from 'utils/api-config.js'
import LoadingSpinner from 'components/loading-spinner.js'
import { Terraland } from 'types/nft.js'
import { ipfsUrlToGatewayUrl, maskWalletAddress, truncate } from 'utils/string-utils.js'
import { UserContext } from 'context/user-context.js'
import { User, UserCapabilities } from 'hooks/use-user'
import { useNftSeller } from 'hooks/use-nft-seller.js'

type PlotInfoDialogProps = {
    visible: boolean
    onClose: () => void
    nftId: string
}

const PlotInfoDialog = ({ visible, onClose, nftId }: PlotInfoDialogProps) => {
    const [terraland, setTerraland] = useState<Terraland | null>()
    const [ipfsImageUrl, setIpfsImageUrl] = useState<string | null>()
    const [userCapability, setUserCapability] = useState<UserCapabilities | null>()
    const [error, setError] = useState<string | null>()
    const [waiting, setWaiting] = useState<boolean>(false)
    const user = useContext<User>(UserContext)
    const { sell, buy, withdraw, unit } = useNftSeller()
    const assetPrice = 10
    const [terralandName, setTerralandName] = useState('')

    useEffect(() => {
        async function fetchTerraland() {
            setIpfsImageUrl(null)
            setError(null)
            setTerraland(null)

            const response = await fetch(endpoints.nft(nftId))

            if (response.ok) {
                const { asset } = await response.json()

                setTerraland({
                    ...asset,
                    name: removeSuffix(asset.name, TRDL_SUFFIX)
                })

                setTerralandName(removeSuffix(asset.name, TRDL_SUFFIX))

                try {
                    const ipfsResponse = await fetch(ipfsUrlToGatewayUrl(asset.url))

                    if (ipfsResponse.ok) {
                        const { image, description } = await ipfsResponse.json()
                        setIpfsImageUrl(ipfsUrlToGatewayUrl(image))
                        setTerraland(trld => ({
                            ...(trld as Terraland),
                            description: description.text as string
                        }))
                    }
                } catch (e) {}
            } else {
                setError(strings.errorFetchingTerraland)
            }
        }
        nftId && visible && fetchTerraland()
    }, [nftId, visible])

    useEffect(() => {
        if (user && user.authenticated && terraland) {
            const owned = terraland.holders.some(holder => holder.address === user.walletAddress)
            const onSale = !!terraland.contractId
            const isSeller = terraland.sellerAddress === user.walletAddress

            if (owned && !onSale) setUserCapability(UserCapabilities.CAN_SELL)
            else if (isSeller && onSale) setUserCapability(UserCapabilities.CAN_WITHDRAW)
            else if (!owned && !isSeller && onSale) setUserCapability(UserCapabilities.CAN_BUY)
            else setUserCapability(null)
        }
    }, [terraland, user])

    async function onSell() {
        if (!terraland) return

        setWaiting(true)
        setError(null)

        try {
            const { applicationId, contractInfo } = await sell({
                tokenId: terraland.id,
                price: assetPrice
            })
            setTerraland({ ...terraland, contractId: applicationId, contractInfo })
            onClose()
        } catch (e) {
            setError(strings.errorCreatingNftSaleContract)
            return
        } finally {
            setWaiting(false)
        }
    }

    async function onWithdraw() {
        if (!terraland) return

        setWaiting(true)
        setError(null)

        try {
            await withdraw(terraland.id, terraland.contractId, terraland.contractInfo)
            setTerraland({ ...terraland, contractId: undefined, contractInfo: undefined })
            onClose()
        } catch (e) {
            setError(strings.errorDeletingNftSaleContract)
        } finally {
            setWaiting(false)
        }
    }

    async function onBuy() {
        if (!terraland) return

        setWaiting(true)
        setError(null)

        try {
            await buy(terraland.contractInfo)
            setTerraland({ ...terraland, contractId: undefined, contractInfo: undefined })
            onClose()
        } catch (e) {
            setError(strings.errorBuyingNft)
        } finally {
            setWaiting(false)
        }
    }

    return (
        <ModalDialog visible={visible} title={strings.terralandInformation} subtitle={terralandName} onClose={onClose}>
            <div className={styles.container}>
                {terraland && !error && (
                    <>
                        <div className={styles.imageSection}>
                            {/* TODO: replace with Image */}
                            <picture>
                                <source srcSet={terraland.offchainUrl} type={'image/*'} />
                                <img src={ipfsImageUrl ? ipfsImageUrl : terraland.offchainUrl} alt={terraland.name} />
                            </picture>
                        </div>
                        <div className={styles.textSection}>
                            <dl className={styles.dList}>
                                <div className={styles.dListItem}>
                                    <dt>{strings.name}</dt>
                                    <dd>{terraland.name}</dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>{strings.description}</dt>
                                    <dd>{truncate(`${terraland.description}`, 15)}</dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>Position</dt>
                                    <dd>
                                        ({terraland.positionX},{terraland.positionY})
                                    </dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>{strings.assetID}</dt>
                                    <dd>{terraland.id}</dd>
                                </div>

                                <div className={styles.dListItem}>
                                    <dt>Holder</dt>
                                    <dd>{maskWalletAddress(terraland.holders[0].address)}</dd>
                                </div>

                                {terraland.contractId && (
                                    <div className={styles.dListItem}>
                                        <dt>Contract</dt>
                                        <dd>{terraland.contractId}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </>
                )}
                {!terraland && !error && (
                    <div className={styles.loader}>
                        <LoadingSpinner />
                    </div>
                )}
                {error && <div className={styles.error}>{error}</div>}

                {userCapability === UserCapabilities.CAN_SELL && terraland && (
                    <Button
                        type={'outline'}
                        className={styles.button}
                        label={`${strings.sellFor} ${assetPrice} $${unit}`}
                        loading={waiting}
                        onClick={onSell}
                    />
                )}

                {userCapability === UserCapabilities.CAN_WITHDRAW && terraland && (
                    <Button
                        type={'outline'}
                        className={styles.button}
                        label={strings.withdraw}
                        loading={waiting}
                        onClick={onWithdraw}
                    />
                )}

                {userCapability === UserCapabilities.CAN_BUY && terraland && (
                    <Button
                        className={styles.button}
                        type={'outline'}
                        label={`${strings.buyFor} ${terraland.assetPrice} $${unit}`}
                        loading={waiting}
                        onClick={onBuy}
                    />
                )}
            </div>
        </ModalDialog>
    )
}

export default PlotInfoDialog

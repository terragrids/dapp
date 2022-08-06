/* eslint-disable @next/next/no-img-element */
import ModalDialog from 'components/modal-dialog'
import styles from './plot-info-dialog.module.scss'
import React, { useEffect, useState } from 'react'
import Button from 'components/button'
import { strings } from 'strings/en'
import { removeSuffix, shortenAddress, TRDL_SUFFIX } from './plot-helpers'
import { endpoints } from 'utils/api-config.js'
import LoadingSpinner from 'components/loading-spinner.js'
import { Terraland } from 'types/nft.js'
import { ipfsUrlToGatewayUrl } from 'utils/string-utils.js'

type PlotInfoDialogProps = {
    visible: boolean
    onClose: () => void
    nftId: string
}

const PlotInfoDialog = ({ visible, onClose, nftId }: PlotInfoDialogProps) => {
    const [terraland, setTerraland] = useState<Terraland | null>()
    const [ipfsImageUrl, setIpfsImageUrl] = useState<string | null>()
    const [error, setError] = useState<string | null>()

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

                const ipfsResponse = await fetch(ipfsUrlToGatewayUrl(asset.url))

                if (ipfsResponse.ok) {
                    const { image } = await ipfsResponse.json()
                    setIpfsImageUrl(ipfsUrlToGatewayUrl(image))
                }
            } else {
                setError(strings.errorFetchingTerraland)
            }
        }
        nftId && fetchTerraland()
    }, [nftId])

    return (
        <ModalDialog visible={visible} title={strings.terralandInformation} onClose={onClose}>
            <div className={styles.container}>
                {terraland && !error &&
                    <>
                        <div className={styles.section}>
                            {/* TODO: replace with Image */}
                            <picture>
                                <source srcSet={terraland.offchainUrl} type={'image/*'} />
                                <img src={ipfsImageUrl ? ipfsImageUrl : terraland.offchainUrl} alt={terraland.name} />
                            </picture>
                        </div>
                        <div className={styles.section}>
                            <p>Name: {terraland.name}</p>
                            <p>Id : {terraland.id}</p>
                            <p>
                                Position : ({terraland.positionX},{terraland.positionY})
                            </p>
                            <div className={styles.section}>
                                <h4>Holders</h4>
                                <ul>
                                    {terraland.holders.map(holder => (
                                        <li style={{ listStyle: 'none' }} key={holder.address + holder.amount}>
                                            <p>- address : {shortenAddress(holder.address)}</p>
                                            <p>- amount: {holder.amount}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                }
                {!terraland && !error && <div className={styles.loader}><LoadingSpinner /></div>}
                {error && <div className={styles.error}>{error}</div>}

                <Button
                    className={styles.button}
                    disabled={false}
                    label={strings.close}
                    loading={false}
                    onClick={onClose}
                />
            </div>
        </ModalDialog>
    )
}

export default PlotInfoDialog

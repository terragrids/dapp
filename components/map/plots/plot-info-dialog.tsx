import ModalDialog from 'components/modal-dialog'
import styles from './plot-info-dialog.module.scss'
import React, { useEffect, useState } from 'react'
import Button from 'components/button'
import { ImagePicker } from 'components/image-picker'
import { strings } from 'strings/en'
import { removeSuffix, shortenAddress, TRDL_SUFFIX } from './plot-helpers'
import { endpoints } from 'utils/api-config.js'
import LoadingSpinner from 'components/loading-spinner.js'
import { Terraland } from 'types/nft.js'

type PlotInfoDialogProps = {
    visible: boolean
    onClose: () => void
    nftId: string
}

const PlotInfoDialog = ({ visible, onClose, nftId }: PlotInfoDialogProps) => {
    const [terraland, setTerraland] = useState<Terraland | null>()
    const [error, setError] = useState<string | null>()

    useEffect(() => {
        async function fetchTerraland() {
            setError(null)
            setTerraland(null)
            const response = await fetch(endpoints.nft(nftId))
            if (response.status === 200) {
                const { asset } = await response.json()
                setTerraland(asset)
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
                            {/* Can remove `ImagePicker` once this dialog is fully implemented
                       for now just to show if the right plot is selected */}
                            <ImagePicker
                                url={terraland.offchainUrl}
                                onFilesPicked={array => {
                                    return array
                                }}
                            />
                        </div>
                        <div className={styles.section}>
                            <p>Name: {removeSuffix(terraland.name, TRDL_SUFFIX)}</p>
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
                {!terraland && error && <div className={styles.error}>{error}</div>}

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

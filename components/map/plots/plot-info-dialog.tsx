import ModalDialog from 'components/modal-dialog'
import styles from './plot-info-dialog.module.scss'

import React from 'react'
import Button from 'components/button'
import { ImagePicker } from 'components/image-picker'
import { strings } from 'strings/en'
import { removeSuffix, shortenAddress, TRDL_SUFFIX } from './plot-helpers'

type PlotInfoDialogProps = {
    visible: boolean
    onClose: () => void
    plotInfo: MapPlotType | undefined
}

const PlotInfoDialog = ({ visible, onClose, plotInfo }: PlotInfoDialogProps) => {
    if (!plotInfo) return null

    const { name, positionX, positionY, offchainUrl, holders } = plotInfo

    return (
        <ModalDialog visible={visible} title={strings.terralandInformation} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.section}>
                    {/* Can remove `ImagePicker` once this dialog is fully implemented
                       for now just to show if the right plot is selected */}
                    <ImagePicker
                        url={offchainUrl}
                        onFilesPicked={array => {
                            return array
                        }}
                    />
                </div>
                <div className={styles.section}>
                    <p>Name: {removeSuffix(name, TRDL_SUFFIX)}</p>
                    <p>Plot index : {plotInfo.index}</p>
                    <p>
                        Plot xCoord : {positionX} / yCoord : {positionY}
                    </p>
                    <div className={styles.section}>
                        <h4>Holders</h4>
                        <ul>
                            {holders.map(holder => (
                                <li style={{ listStyle: 'none' }} key={holder.address + holder.amount}>
                                    <p>- address : {shortenAddress(holder.address)}</p>
                                    <p>- amount: {holder.amount}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
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

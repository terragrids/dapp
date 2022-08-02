import ModalDialog from 'components/modal-dialog'
import styles from './tile-info-dialog.module.scss'

import React from 'react'
import Button from 'components/button'
import { ImagePicker } from 'components/image-picker'
import { TileInfo } from 'components/map'

type TileInfoDialogProps = {
    visible: boolean
    onClose: () => void
    tileInfo: TileInfo | undefined
}

const TileInfoDialog = ({
    visible,
    onClose,
    tileInfo
}: TileInfoDialogProps) => {
    if (!tileInfo) return null

    return (
        <ModalDialog
            visible={visible}
            title={'Selected tile infomation'}
            onClose={onClose}
        >
            <div className={styles.container}>
                <div className={styles.section}>
                    {/* Can remove `ImagePicker` once this dialog is fully implemented
                       for now just to show if the right tile is selected */}
                    <ImagePicker
                        url={tileInfo.imageUrl}
                        onFilesPicked={(array) => {
                            return array
                        }}
                    />
                </div>
                <div className={styles.section}>
                    <p>Tile index : {tileInfo.index}</p>
                    <p>
                        Tile xCoord : {tileInfo.xCoord} / yCoord :{' '}
                        {tileInfo.yCoord}
                    </p>
                </div>
                <Button
                    className={styles.button}
                    disabled={false}
                    label={'Close'}
                    loading={false}
                    onClick={onClose}
                />
            </div>
        </ModalDialog>
    )
}

export default TileInfoDialog

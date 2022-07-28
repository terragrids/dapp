
import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import { useState } from 'react'
import { strings } from 'strings/en.js'
import { Nft } from 'types/nft'
import Button from './button.js'
import { DropDownSelector } from './drop-down-selector'
import { ImageUploader } from './image-uploader'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

export const NftMintDialog = ({ visible, onClose }: Props) => {
    type Asset = {
        name: string
        description: string
    }

    const [asset] = useState<Asset>({ name: 'name', description: 'description' })
    const { upload, uploadState } = useFileUploader(asset)
    const [file, setFile] = useState<File>()

    return (
        <ModalDialog
            visible={visible}
            title={strings.mintNft}
            onClose={onClose} >
            <div className={styles.container}>
                <div className={styles.section}><ImageUploader onFileSelected={file => setFile(file)} /></div>
                <div className={styles.section}>
                    <DropDownSelector options={Nft.currencyList()} />
                </div>
                <Button
                    className={styles.button}
                    disabled={!file}
                    label={strings.mint}
                    loading={uploadState != FileUploadState.IDLE && uploadState != FileUploadState.ERROR}
                    onClick={() => { if (file) upload(file) }} />
            </div>
        </ModalDialog>
    )
}

type Props = {
    visible: boolean
    onClose: () => void
};

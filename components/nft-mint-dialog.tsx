
import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import { useState } from 'react'
import { strings } from 'strings/en.js'
import Button from './button.js'
import { ImageUploader } from './image-uploader'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

export const NftMintDialog = ({ visible, onClose }: Props) => {
    const { upload, uploadState } = useFileUploader()
    const [file, setFile] = useState<File>()
    return (
        <ModalDialog
            visible={visible}
            title={strings.mintNft}
            onClose={onClose} >
            <div className={styles.container}>
                <div className={styles.uploader}><ImageUploader onFileSelected={file => setFile(file)} /></div>
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

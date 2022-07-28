
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
        symbol: string
    }

    const [asset, setAsset] = useState<Asset>({ name: 'name', description: 'description', symbol: Nft.TRCL.symbol })
    const { upload, uploadState } = useFileUploader(asset)
    const [file, setFile] = useState<File>()

    function onNftTypeSelected(symbol: string) {
        setAsset(asset => ({
            ...asset,
            symbol: symbol
        }))
    }

    function isValidAsset() {
        return !!asset.name && !!asset.description && !!asset.symbol
    }

    return (
        <ModalDialog
            visible={visible}
            title={strings.mintNft}
            onClose={onClose} >
            <div className={styles.container}>
                <div className={styles.section}><ImageUploader onFileSelected={file => setFile(file)} /></div>
                <div className={styles.section}>
                    <DropDownSelector
                        options={Nft.list().map(nft => ({ key: nft.symbol, value: nft.toString() }))}
                        onSelected={onNftTypeSelected} />
                </div>
                <Button
                    className={styles.button}
                    disabled={!file || !isValidAsset()}
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

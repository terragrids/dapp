
import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import { useState } from 'react'
import { strings } from 'strings/en.js'
import { Nft } from 'types/nft'
import Button from './button.js'
import { DropDownSelector } from './drop-down-selector'
import { ImageUploader } from './image-uploader'
import { InputField } from './input-field'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

export const NftMintDialog = ({ visible, onClose }: Props) => {
    type Asset = {
        name: string
        description: string
        symbol: string
        power?: number
    }

    const [asset, setAsset] = useState<Asset>({ name: '', description: 'description', symbol: Nft.TRCL.symbol })
    const { upload, uploadState } = useFileUploader(asset)
    const [file, setFile] = useState<File>()

    function setNftSymbol(symbol: string) {
        setAsset(asset => ({ ...asset, symbol }))
    }

    function setNftName(name: string) {
        setAsset(asset => ({ ...asset, name }))
    }

    function setNftDescription(name: string) {
        setAsset(asset => ({ ...asset, name }))
    }

    function isValidNft() {
        let valid = !!asset.name && !!asset.description && !!asset.symbol
        if (asset.symbol === Nft.TRCL.symbol) valid = valid && !!asset.power && asset.power > 0
        return valid
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
                        label={strings.type}
                        options={Nft.list().map(nft => ({ key: nft.symbol, value: nft.toString() }))}
                        onSelected={setNftSymbol} />
                </div>
                <div className={styles.section}>
                    <InputField label={strings.name} onChange={setNftName} />
                </div>
                <div className={styles.section}>
                    <InputField multiline max={512} label={strings.description} onChange={setNftDescription} />
                </div>
                {asset.symbol === Nft.TRCL.symbol &&
                    <div className={styles.section}>
                        <InputField type={'number'} initialValue={'10'} label={strings.nominalPower} onChange={setNftDescription} />
                    </div>
                }
                <Button
                    className={styles.button}
                    disabled={!file || !isValidNft()}
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

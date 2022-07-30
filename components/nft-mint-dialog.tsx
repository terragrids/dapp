
import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import { useTokenMinter } from 'hooks/use-token-minter'
import { useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { Nft } from 'types/nft'
import Button from './button.js'
import { DropDownSelector } from './drop-down-selector'
import { ImageUploader } from './image-uploader'
import { InputField } from './input-field'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

enum MintState {
    IDLE, MINTING, MINTED, ERROR
}

export const NftMintDialog = ({ visible, onClose }: Props) => {
    type Asset = {
        name: string
        description: string
        symbol: string
        power?: number
    }

    const [asset, setAsset] = useState<Asset>({ name: '', description: '', symbol: Nft.TRCL.symbol, power: 10 })
    const { upload, uploadState, fileProps } = useFileUploader(asset)
    const { mint } = useTokenMinter()
    const [file, setFile] = useState<File>()
    const [mintState, setMintState] = useState<MintState>(MintState.IDLE)

    function setNftSymbol(symbol: string) {
        setAsset(asset => ({ ...asset, symbol }))
    }

    function setNftName(name: string) {
        setAsset(asset => ({ ...asset, name }))
    }

    function setNftDescription(description: string) {
        setAsset(asset => ({ ...asset, description }))
    }

    function setNftPower(power: string) {
        setAsset(asset => ({ ...asset, power: +power }))
    }

    function isValidNft() {
        let valid = !!asset.name && !!asset.description && !!asset.symbol
        if (asset.symbol === Nft.TRCL.symbol) valid = valid && !!asset.power && asset.power > 0
        return valid
    }

    useEffect(() => {
        async function mintToken() {
            setMintState(MintState.MINTING)
            const success = await mint({
                name: fileProps.arc3Name,
                symbol: asset.symbol,
                url: fileProps.ipfsMetadataUrl,
                metadataHash: fileProps.ipfsMetadataHash
            })
            setMintState(success ? MintState.MINTED : MintState.ERROR)
        }
        if (uploadState === FileUploadState.PINNED && mintState === MintState.IDLE) {
            mintToken()
        }
    }, [asset.symbol, fileProps.arc3Name, fileProps.ipfsMetadataHash, fileProps.ipfsMetadataUrl, mint, mintState, uploadState])

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
                        <InputField type={'number'} initialValue={'10'} label={strings.nominalPower} onChange={setNftPower} />
                    </div>
                }
                <Button
                    className={styles.button}
                    disabled={!file || !isValidNft()}
                    label={strings.mint}
                    loading={uploadState != FileUploadState.IDLE && uploadState != FileUploadState.ERROR && mintState !== MintState.IDLE && mintState !== MintState.MINTED && mintState !== MintState.ERROR}
                    onClick={() => { if (file) upload(file) }} />

                {uploadState === FileUploadState.ERROR && <div className={styles.error}>{strings.errorUploadingFile}</div>}
                {mintState === MintState.ERROR && <div className={styles.error}>{strings.errorMinting}</div>}
            </div>
        </ModalDialog>
    )
}

type Props = {
    visible: boolean
    onClose: () => void
};

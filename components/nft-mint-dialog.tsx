
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
type Asset = {
    name: string
    symbol: string
    description: AssetDescription
}

type AssetDescription = {
    text?: string
    power?: number
    positionX?: number
    positionY?: number
}

const defaultAsset = { name: '', description: {} as AssetDescription, symbol: Nft.TRCL.symbol, power: 10 } as Asset

export const NftMintDialog = ({ visible, onClose }: Props) => {
    const [asset, setAsset] = useState<Asset>(defaultAsset)
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
        setAsset(asset => ({ ...asset, description: { ...asset.description, text: description } }))
    }

    function setNftPower(power: string) {
        setAsset(asset => ({ ...asset, description: { ...asset.description, power: +power } }))
    }

    function setNftPositionX(x: string) {
        setAsset(asset => ({ ...asset, description: { ...asset.description, positionX: +x } }))
    }

    function setNftPositionY(y: string) {
        setAsset(asset => ({ ...asset, description: { ...asset.description, positionY: +y } }))
    }

    function isValidNft() {
        let valid = !!asset.name && !!asset.description.text && !!asset.symbol
        if (asset.symbol === Nft.TRCL.symbol) valid = valid && !!asset.description.power && asset.description.power > 0
        if (asset.symbol === Nft.TRLD.symbol) valid = valid && asset.description.positionX !== undefined && asset.description.positionY !== undefined
        return valid
    }

    function isInProgress() {
        const uploading = uploadState != FileUploadState.IDLE && uploadState != FileUploadState.ERROR // don't count PINNED to avoid stopping progress before minting starts
        const minting = mintState === MintState.MINTING
        const minted = mintState === MintState.MINTED
        return !minted && (uploading || minting)
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
        if (mintState === MintState.MINTED) {
            setTimeout(function () { onClose() }, 2000)
        }
    }, [asset.symbol, fileProps.arc3Name, fileProps.ipfsMetadataHash, fileProps.ipfsMetadataUrl, mint, mintState, uploadState, onClose])

    useEffect(() => {
        if (visible) {
            setMintState(MintState.IDLE)
            setAsset(defaultAsset)
        }
    }, [visible])

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
                {asset.symbol === Nft.TRLD.symbol &&
                    <>
                        <div className={styles.section}>
                            <InputField type={'number'} initialValue={'0'} label={strings.positionX} onChange={setNftPositionX} />
                        </div>
                        <div className={styles.section}>
                            <InputField type={'number'} initialValue={'0'} label={strings.positionY} onChange={setNftPositionY} />
                        </div>
                    </>
                }
                <Button
                    className={styles.button}
                    disabled={!file || !isValidNft()}
                    label={strings.mint}
                    loading={isInProgress()}
                    checked={mintState === MintState.MINTED}
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


import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import usePrevious from 'hooks/use-previous.js'
import { useTokenMinter } from 'hooks/use-token-minter'
import { useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { setTimeout } from 'timers'
import { Nft } from 'types/nft'
import { endpoints } from 'utils/api-config.js'
import Button from './button.js'
import { DropDownSelector } from './drop-down-selector'
import { ImageUploader } from './image-uploader'
import { InputField } from './input-field'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

enum MintState {
    IDLE, MINTING, SAVING, DONE, ERROR
}
type Asset = {
    id?: string
    name: string
    symbol: string
    details: AssetDetails
    description: object
}

type AssetDetails = {
    text: string
    power: number
    positionX: number
    positionY: number
}

const defaultAsset = {
    name: '',
    symbol: Nft.TRCL.symbol,
    details: {
        text: '',
        power: 10,
        positionX: 0,
        positionY: 0
    } as AssetDetails
} as Asset

export const NftMintDialog = ({ visible, onClose }: Props) => {
    const [asset, setAsset] = useState<Asset>(defaultAsset)
    const { upload, uploadState, fileProps, reset: resetFileUploader } = useFileUploader(asset)
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
        setAsset(asset => ({ ...asset, details: { ...asset.details, text: description } }))
    }

    function setNftPower(power: string) {
        setAsset(asset => ({ ...asset, details: { ...asset.details, power: +power } }))
    }

    function setNftPositionX(x: string) {
        setAsset(asset => ({ ...asset, details: { ...asset.details, positionX: +x } }))
    }

    function setNftPositionY(y: string) {
        setAsset(asset => ({ ...asset, details: { ...asset.details, positionY: +y } }))
    }

    function isValidNft() {
        let valid = !!asset.name && !!asset.symbol && !!asset.details.text
        if (asset.symbol === Nft.TRCL.symbol) valid = valid && !!asset.details.power && asset.details.power > 0
        if (asset.symbol === Nft.TRLD.symbol) valid = valid && asset.details.positionX !== undefined && asset.details.positionY !== undefined
        return valid
    }

    function isInProgress() {
        const uploading = uploadState != FileUploadState.IDLE
        const minting = mintState === MintState.MINTING
        const saving = mintState === MintState.SAVING
        const minted = mintState === MintState.DONE
        const failed = uploadState === FileUploadState.ERROR || mintState === MintState.ERROR
        return !minted && !failed && (uploading || minting || saving)
    }

    /**
     * 1. Save NFT file on S3 and IPFS 
     */
    function onUpload() {
        if (!file) return

        switch (asset.symbol) {
            case Nft.TRCL.symbol:
                setAsset(asset => ({
                    ...asset, description: {
                        text: asset.details.text,
                        power: asset.details.power
                    }
                }))
                break
            case Nft.TRLD.symbol:
                setAsset(asset => ({
                    ...asset, description: {
                        text: asset.details.text,
                        positionX: asset.details.positionX,
                        positionY: asset.details.positionY
                    }
                }))
                break
            case Nft.TRAS.symbol:
                setAsset(asset => ({
                    ...asset, description: {
                        text: asset.details.text
                    }
                }))
                break
        }
        upload(file)
    }

    /**
     * 2. Mint token on the blockchain
     */
    useEffect(() => {
        async function mintToken() {
            setMintState(MintState.MINTING)
            const assetId = await mint({
                name: fileProps.arc3Name,
                symbol: asset.symbol,
                url: fileProps.ipfsMetadataUrl,
                metadataHash: fileProps.ipfsMetadataHash
            })

            if (assetId) {
                setAsset(asset => ({ ...asset, id: assetId }))
                setMintState(MintState.SAVING)
            } else {
                setMintState(MintState.ERROR)
            }
        }

        if (uploadState === FileUploadState.PINNED && mintState === MintState.IDLE) {
            mintToken()
        }
    }, [asset.symbol, fileProps.arc3Name, fileProps.ipfsMetadataHash, fileProps.ipfsMetadataUrl, mint, mintState, uploadState])

    /**
     * 3. Save token off-chain
     */
    useEffect(() => {
        async function saveToken() {
            const response = await fetch(endpoints.nfts, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    assetId: asset.id,
                    symbol: asset.symbol,
                    offchainUrl: fileProps.offChainUrl,
                    ...asset.symbol === Nft.TRCL.symbol && { power: asset.details.power },
                    ...asset.symbol === Nft.TRLD.symbol && { positionX: asset.details.positionX, positionY: asset.details.positionY }
                })
            })

            setMintState(response.status === 201 ? MintState.DONE : MintState.ERROR)
        }

        if (mintState === MintState.SAVING) {
            saveToken()
        }
    }, [asset.details.positionX, asset.details.positionY, asset.details.power, asset.id, asset.symbol, fileProps.offChainUrl, mintState])

    /**
     * 4. All done, close dialog
     */
    useEffect(() => {
        if (mintState === MintState.DONE) {
            resetFileUploader()
            setTimeout(function () {
                setMintState(MintState.IDLE)
                onClose()
            }, 2000)
        }
    }, [mintState, onClose, resetFileUploader])

    /**
     * Reset state when opening the dialog
     */
    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && prevVisible === false) {
            setMintState(MintState.IDLE)
            resetFileUploader()
            setAsset(defaultAsset)
        }
    }, [prevVisible, resetFileUploader, visible])

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
                    <InputField max={26} label={strings.name} onChange={setNftName} />
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
                    checked={mintState === MintState.DONE}
                    onClick={onUpload} />

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

import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import usePrevious from 'hooks/use-previous.js'
import { useTokenMinter } from 'hooks/use-token-minter'
import { useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { setTimeout } from 'timers'
import { Nft } from 'types/nft'
import { getHashFromIpfsUrl } from 'utils/string-utils.js'
import Button from './button'
import { DropDownSelector } from './drop-down-selector'
import { ImageUploader } from './image-uploader'
import { InputField } from './input-field'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

enum MintState {
    IDLE,
    MINTING,
    DONE,
    ERROR
}
type Asset = {
    id?: string
    name: string
    symbol: string
    description: string
    properties: AssetProperties
}

type AssetProperties = {
    power: number
    price: number
    rarity: string
    author: string
}

const defaultAsset = {
    name: '',
    symbol: Nft.list()[0].symbol,
    properties: {
        price: 10,
        rarity: 'common',
        author: ''
    } as AssetProperties
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
        setAsset(asset => ({ ...asset, name: name.trim() }))
    }

    function setNftDescription(description: string) {
        setAsset(asset => ({ ...asset, description: description.trim() }))
    }

    function setNftPower(power: string) {
        setAsset(asset => ({ ...asset, properties: { ...asset.properties, power: +power } }))
    }

    function setNftPrice(price: string) {
        setAsset(asset => ({ ...asset, properties: { ...asset.properties, price: +price } }))
    }

    function setNftRarity(rarity: string) {
        setAsset(asset => ({ ...asset, properties: { ...asset.properties, rarity } }))
    }

    function setNftAuthor(author: string) {
        setAsset(asset => ({ ...asset, properties: { ...asset.properties, author: author.trim() } }))
    }

    function isValidNft() {
        let valid =
            !!asset.name &&
            !!asset.symbol &&
            !!asset.description &&
            asset.properties.price > 0 &&
            !!asset.properties.author
        if (asset.symbol === Nft.TRCL.symbol) valid = valid && !!asset.properties.power && asset.properties.power > 0
        return valid
    }

    function isInProgress() {
        const uploading = uploadState != FileUploadState.IDLE
        const minting = mintState === MintState.MINTING
        const minted = mintState === MintState.DONE
        const failed = uploadState === FileUploadState.ERROR || mintState === MintState.ERROR
        return !minted && !failed && (uploading || minting)
    }

    /**
     * 1. Save NFT file on S3 and IPFS
     */
    function onUpload() {
        if (!file) return
        upload(file)
    }

    /**
     * 2. Mint token on the blockchain and put it up for sale
     */
    useEffect(() => {
        async function mintToken() {
            setMintState(MintState.MINTING)
            const cid = getHashFromIpfsUrl(fileProps.ipfsMetadataUrl)

            const result = await mint(
                asset.symbol,
                fileProps.name as string,
                cid,
                asset.properties.price,
                fileProps.offChainUrl as string
            )

            if (result) {
                setAsset(asset => ({ ...asset, id: result.tokenId }))
                setMintState(MintState.DONE)
            } else {
                setMintState(MintState.ERROR)
            }
        }

        if (uploadState === FileUploadState.PINNED && mintState === MintState.IDLE) {
            mintToken()
        }
    }, [
        asset.properties.price,
        asset.symbol,
        fileProps.ipfsMetadataUrl,
        fileProps.name,
        fileProps.offChainUrl,
        mint,
        mintState,
        uploadState
    ])

    /**
     * 3. All done, close dialog
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
        <ModalDialog visible={visible} title={strings.mintNft} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <ImageUploader onFileSelected={file => setFile(file)} />
                </div>
                <div className={styles.section}>
                    <DropDownSelector
                        label={strings.type}
                        options={Nft.list().map(nft => ({ key: nft.symbol, value: nft.toString() }))}
                        onSelected={setNftSymbol}
                    />
                </div>
                <div className={styles.section}>
                    <DropDownSelector
                        label={strings.rarity}
                        options={[
                            { key: 'common', value: strings.common },
                            { key: 'rare', value: strings.rare },
                            { key: 'legendary', value: strings.legendary }
                        ]}
                        onSelected={setNftRarity}
                    />
                </div>
                <div className={styles.section}>
                    <InputField max={26} label={strings.name} onChange={setNftName} />
                </div>
                <div className={styles.section}>
                    <InputField multiline max={5000} label={strings.description} onChange={setNftDescription} />
                </div>
                {asset.symbol === Nft.TRCL.symbol && (
                    <div className={styles.section}>
                        <InputField
                            type={'number'}
                            initialValue={'10'}
                            label={strings.nominalPower}
                            onChange={setNftPower}
                        />
                    </div>
                )}
                <div className={styles.section}>
                    <InputField max={26} label={strings.author} onChange={setNftAuthor} />
                </div>
                <div className={styles.section}>
                    <InputField type={'number'} initialValue={'10'} label={strings.basePrice} onChange={setNftPrice} />
                </div>
                <Button
                    className={styles.button}
                    disabled={!file || !isValidNft()}
                    label={strings.mint}
                    loading={isInProgress()}
                    checked={mintState === MintState.DONE}
                    onClick={onUpload}
                />

                {uploadState === FileUploadState.ERROR && (
                    <div className={styles.error}>{strings.errorUploadingFile}</div>
                )}
                {mintState === MintState.ERROR && <div className={styles.error}>{strings.errorMinting}</div>}
            </div>
        </ModalDialog>
    )
}

type Props = {
    visible: boolean
    onClose: () => void
}

import LoadingSpinner from 'components/loading-spinner.js'
import { ReachContext, ReachStdlib } from 'context/reach-context'
import { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { TerragridsNft } from 'types/nft.js'
import { endpoints, ipfsUrl } from 'utils/api-config.js'
import { getContractFromJsonString, ipfsUrlToGatewayUrl } from 'utils/string-utils.js'
import { cidFromAlgorandAddress } from 'utils/token-utils.js'
import styles from './nft-card.module.scss'
import NftInfo from './nft-info'

type NftCardProps = {
    id: string
    positionX?: number
    positionY?: number
    onNftReady?: (nft: TerragridsNft) => void
}

const NftCard = ({ id, positionX, positionY, onNftReady }: NftCardProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const [nft, setNft] = useState<TerragridsNft | null>()
    const [ipfsImageUrl, setIpfsImageUrl] = useState<string | null>()
    const [error, setError] = useState<string | null>(null)

    const fetchNft = useCallback(async () => {
        setError(null)

        const response = await fetch(endpoints.nft(id))

        if (response.ok) {
            const asset = await response.json()
            const cid = cidFromAlgorandAddress(stdlib.algosdk, asset.reserve)
            const metadataUrl = ipfsUrl(cid)
            setNft(asset)

            // Try to fetch NFT metadata and image from IPFS
            try {
                const metadataResponse = await fetch(metadataUrl)
                if (metadataResponse.ok) {
                    const { image, description, properties } = await metadataResponse.json()
                    setIpfsImageUrl(ipfsUrlToGatewayUrl(image))

                    const nft = {
                        ...(asset as TerragridsNft),
                        description: description as string,
                        contractId: stdlib.bigNumberToNumber(getContractFromJsonString(asset.contractId)),
                        contractInfo: asset.contractId,
                        assetPrice: properties['base_price']?.value,
                        rarity: properties.rarity.value,
                        author: properties.author.value
                    }
                    setNft(nft)
                    if (onNftReady) onNftReady(nft)
                }
            } catch (e) {}
        } else {
            setError(strings.errorFetchingNft)
        }
    }, [id, onNftReady, stdlib])

    useEffect(() => {
        if (!nft) fetchNft()
    }, [fetchNft, nft])

    return (
        <div className={styles.container}>
            {!nft && !error && <LoadingSpinner />}
            {!nft && error && <div>{error}</div>}
            {nft && (
                <>
                    <picture>
                        <source srcSet={nft.offChainImageUrl} type={'image/*'} />
                        <img src={ipfsImageUrl ? ipfsImageUrl : nft.offChainImageUrl} alt={nft.name} />
                    </picture>
                    <div className={styles.details}>
                        <NftInfo asset={{ ...nft, positionX, positionY } as TerragridsNft} />
                    </div>
                </>
            )}
        </div>
    )
}

export default NftCard

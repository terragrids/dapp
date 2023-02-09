import Button, { ButtonType } from 'components/button'
import LoadingSpinner from 'components/loading-spinner.js'
import { ReachContext, ReachStdlib } from 'context/reach-context'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user'
import { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { NftStatus, TerragridsNft } from 'types/nft'
import { endpoints, ipfsUrl } from 'utils/api-config.js'
import { getContractFromJsonString, ipfsUrlToGatewayUrl } from 'utils/string-utils.js'
import { cidFromAlgorandAddress } from 'utils/token-utils.js'
import styles from './nft-card.module.scss'
import NftInfo from './nft-info'

type NftCardProps = {
    id: string
}

const NftCard = ({ id }: NftCardProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const [nft, setNft] = useState<TerragridsNft | null>()
    const [ipfsImageUrl, setIpfsImageUrl] = useState<string | null>()
    const [error, setError] = useState<string | null>(null)
    const user = useContext<User>(UserContext)

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
                    setNft(nft => ({
                        ...(nft as TerragridsNft),
                        description: description as string,
                        contractId: stdlib.bigNumberToNumber(getContractFromJsonString(asset.contractId)),
                        assetPrice: properties.price?.value,
                        rarity: properties.rarity.value,
                        author: properties.author.value
                    }))
                }
            } catch (e) {}
        } else {
            setError(strings.errorFetchingNft)
        }
    }, [id, stdlib])

    function onSell() {
        // todo
    }

    useEffect(() => {
        fetchNft()
    }, [fetchNft])

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
                        <NftInfo asset={nft} />
                    </div>
                    {user && user.isAdmin && nft.status === NftStatus.Created && (
                        <div className={styles.footer}>
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.sell}
                                onClick={onSell}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default NftCard

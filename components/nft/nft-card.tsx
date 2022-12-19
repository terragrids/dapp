import LoadingSpinner from 'components/loading-spinner.js'
import { useCallback, useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { TerragridsNft } from 'types/nft.js'
import { endpoints } from 'utils/api-config.js'
import styles from './nft-card.module.scss'

type NftCardProps = {
    id: string
}

const NftCard = ({ id }: NftCardProps) => {
    const [nft, setNft] = useState<TerragridsNft | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchNft = useCallback(async () => {
        setError(null)

        const response = await fetch(endpoints.nft(id))

        if (response.ok) {
            const jsonResponse = await response.json()
            setNft(jsonResponse.asset)
        } else {
            setError(strings.errorFetchingNft)
        }
    }, [id])

    useEffect(() => {
        fetchNft()
    }, [fetchNft])

    return (
        <div className={styles.container}>
            {!nft && !error && <LoadingSpinner />}
            {!nft && error && <div>{error}</div>}
            {nft && <div>{nft.name}</div>}
        </div>
    )
}

export default NftCard

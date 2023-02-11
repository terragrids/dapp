import LoadingSpinner from 'components/loading-spinner.js'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import styles from './nft-list.module.scss'
import usePrevious from 'hooks/use-previous.js'
import Button, { ButtonType } from 'components/button'
import { Nft, NftStatus, TerragridsNft } from 'types/nft'
import NftListItem from './nft-list-item'
import { DropDownSelector } from 'components/drop-down-selector'

type NftPickerProps = {
    onSelect: (nft: TerragridsNft) => void
}

type Error = {
    message: string
    description?: string
}

const NftPicker = ({ onSelect }: NftPickerProps) => {
    const user = useContext<User>(UserContext)
    const [symbol, setSymbol] = useState<string>(Nft.list()[0].symbol)
    const [nfts, setNfts] = useState<Array<TerragridsNft> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>()

    const fetchNfts = useCallback(async () => {
        if (isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.paginatedNfts(symbol.toLowerCase(), NftStatus.FORSALE.code, nextPageKey))

        if (response.ok) {
            const jsonResponse = await response.json()
            setNfts(!nfts ? jsonResponse.assets : nfts.concat(jsonResponse.assets))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError({ message: strings.errorFetchingNfts })
        }

        setIsFetching(false)
    }, [isFetching, nextPageKey, nfts, symbol])

    function reset() {
        setNfts(null)
        setNextPageKey(null)
        setError(null)
    }

    const prevSymbol = usePrevious(symbol)
    useEffect(() => {
        if (symbol !== prevSymbol) {
            reset()
        }
    }, [fetchNfts, prevSymbol, symbol])

    useEffect(() => {
        if (!nfts && !error) {
            fetchNfts()
        }
    }, [error, fetchNfts, nfts])

    function fetchMoreNfts() {
        const hasMore = !!nextPageKey
        if (hasMore) fetchNfts()
    }

    function handleScroll(e: React.UIEvent<HTMLElement>) {
        const margin = 10
        const scroll = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - margin
        const bottom = scroll <= e.currentTarget.clientHeight
        if (bottom) {
            fetchMoreNfts()
        }
    }

    function setNftSymbol(symbol: string) {
        setSymbol(symbol)
    }

    return (
        <div onScroll={handleScroll}>
            <div className={styles.listContainer}>
                <div className={styles.selectors}>
                    <DropDownSelector
                        label={strings.type}
                        options={Nft.list().map(nft => ({ key: nft.symbol, value: nft.toString() }))}
                        onSelected={setNftSymbol}
                    />
                </div>
                {!nfts && !error && (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                    </div>
                )}
                {nfts && nfts.length > 0 && (
                    <div className={styles.scrollContainer}>
                        {nfts.map(nft => (
                            <NftListItem
                                key={nft.id}
                                id={nft.id}
                                name={nft.name}
                                status={user && user.isAdmin ? nft.status : ''}
                                imageUrl={nft.offChainImageUrl}
                                onClick={() => onSelect(nft)}
                            />
                        ))}
                        {isFetching && (
                            <div className={styles.loading}>
                                <LoadingSpinner />
                            </div>
                        )}
                        {!isFetching && !!nextPageKey && (
                            <Button type={ButtonType.OUTLINE} label={strings.showMore} onClick={fetchMoreNfts} />
                        )}
                    </div>
                )}

                {nfts && nfts.length === 0 && <div className={styles.empty}>{strings.noNftsFoundForSearch}</div>}
                {error && <div className={styles.error}>{error.message}</div>}
            </div>
        </div>
    )
}

export default NftPicker

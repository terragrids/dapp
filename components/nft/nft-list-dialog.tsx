import LoadingSpinner from 'components/loading-spinner.js'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import styles from './nft-list-dialog.module.scss'
import usePrevious from 'hooks/use-previous.js'
import Button, { ButtonType } from 'components/button'
import { Nft, TerragridsNft } from 'types/nft'
import NftListItem from './nft-list-item'
import { DropDownSelector } from 'components/drop-down-selector'
import NftCard from './nft-card'

type NftListDialogProps = {
    visible: boolean
    onClose: () => void
}

type Error = {
    message: string
    description?: string
}

const NftListDialog = ({ visible, onClose }: NftListDialogProps) => {
    const user = useContext<User>(UserContext)
    const [symbol, setSymbol] = useState<string>(Nft.TRLD.symbol)
    const [nfts, setNfts] = useState<Array<TerragridsNft> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>()
    const [selectedNft, setSelectedNft] = useState<TerragridsNft | null>()

    const fetchNfts = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.paginatedNfts(symbol.toLowerCase(), nextPageKey))

        if (response.ok) {
            const jsonResponse = await response.json()
            setNfts(!nfts ? jsonResponse.assets : nfts.concat(jsonResponse.assets))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError({ message: strings.errorFetchingNfts })
        }

        setIsFetching(false)
    }, [isFetching, nextPageKey, nfts, symbol, user])

    function reset() {
        setNfts(null)
        setNextPageKey(null)
        setSelectedNft(null)
        setError(null)
    }

    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && !prevVisible) {
            setSymbol(Nft.TRLD.symbol)
            reset()
        }
    }, [prevVisible, visible])

    const prevSymbol = usePrevious(symbol)
    useEffect(() => {
        if (symbol !== prevSymbol) {
            reset()
        }
    }, [fetchNfts, prevSymbol, symbol])

    useEffect(() => {
        if (visible && !nfts && !error) {
            fetchNfts()
        }
    }, [error, fetchNfts, nfts, visible])

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

    function close() {
        if (selectedNft) setSelectedNft(null)
        else onClose()
    }

    return (
        <ModalDialog
            visible={visible}
            title={selectedNft ? selectedNft.name : strings.assets}
            onClose={close}
            onScroll={handleScroll}>
            <>
                {selectedNft && (
                    <div className={styles.detailContainer}>
                        <NftCard id={selectedNft.id} />
                    </div>
                )}
                {!selectedNft && (
                    <div className={styles.listContainer}>
                        <DropDownSelector
                            label={strings.type}
                            options={Nft.list().map(nft => ({ key: nft.symbol, value: nft.toString() }))}
                            onSelected={setNftSymbol}
                        />
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
                                        status={nft.status}
                                        holder={nft.holders[0]}
                                        imageUrl={nft.offchainUrl}
                                        onClick={() => setSelectedNft(nft)}
                                    />
                                ))}
                                {isFetching && (
                                    <div className={styles.loading}>
                                        <LoadingSpinner />
                                    </div>
                                )}
                                {!isFetching && !!nextPageKey && (
                                    <Button
                                        type={ButtonType.OUTLINE}
                                        label={strings.showMore}
                                        onClick={fetchMoreNfts}
                                    />
                                )}
                            </div>
                        )}

                        {nfts && nfts.length === 0 && (
                            <div className={styles.empty}>{strings.noNftsFoundForSearch}</div>
                        )}
                        {error && <div className={styles.error}>{error.message}</div>}
                    </div>
                )}
            </>
        </ModalDialog>
    )
}

export default NftListDialog

import LoadingSpinner from 'components/loading-spinner.js'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context'
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
    const [symbol, setSymbol] = useState<string>(Nft.list()[0].symbol)
    const [status, setStatus] = useState<string>(NftStatus.list()[0].code)
    const [nfts, setNfts] = useState<Array<TerragridsNft> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>()
    const [selectedNft, setSelectedNft] = useState<TerragridsNft | null>()

    const fetchNfts = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.paginatedNfts(symbol.toLowerCase(), status, nextPageKey))

        if (response.ok) {
            const jsonResponse = await response.json()
            setNfts(!nfts ? jsonResponse.assets : nfts.concat(jsonResponse.assets))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError({ message: strings.errorFetchingNfts })
        }

        setIsFetching(false)
    }, [isFetching, nextPageKey, nfts, status, symbol, user])

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

    const prevStatus = usePrevious(status)
    useEffect(() => {
        if (status !== prevStatus) {
            reset()
        }
    }, [prevStatus, status])

    useEffect(() => {
        if (visible && !nfts && !error) {
            fetchNfts()
        }
    }, [error, fetchNfts, nfts, visible])

    function fetchMoreNfts() {
        const hasMore = !!nextPageKey
        if (hasMore) fetchNfts()
    }

    function setNftSymbol(symbol: string) {
        setSymbol(symbol)
    }

    function setNftStatus(status: string) {
        setStatus(status)
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
            onScrollToBottom={fetchMoreNfts}>
            <>
                {selectedNft && (
                    <div className={styles.detailContainer}>
                        <NftCard id={selectedNft.id} />
                    </div>
                )}
                {!selectedNft && (
                    <div className={styles.listContainer}>
                        <div className={styles.selectors}>
                            <DropDownSelector
                                label={strings.type}
                                options={Nft.list().map(nft => ({ key: nft.symbol, value: nft.toString() }))}
                                onSelected={setNftSymbol}
                            />
                            {user && user.isAdmin && (
                                <DropDownSelector
                                    label={strings.status}
                                    options={NftStatus.list().map(nft => ({ key: nft.code, value: nft.name }))}
                                    onSelected={setNftStatus}
                                />
                            )}
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

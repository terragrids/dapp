import LoadingSpinner from 'components/loading-spinner.js'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { Place, PlaceStatus } from 'types/place'
import { endpoints } from 'utils/api-config.js'
import PlaceListItem from './place-list-item'
import styles from './places-dialog.module.scss'
import usePrevious from 'hooks/use-previous.js'
import Button, { ButtonType } from 'components/button'
import { useAuth } from 'hooks/use-auth.js'
import ActionBar from 'components/action-bar'
import { DropDownSelector } from 'components/drop-down-selector'
import PlaceDetails from './place-details'

type PlacesDialogProps = {
    visible: boolean
    filterByUser: boolean
    onClose: () => void
}

type Error = {
    message: string
    description?: string
}

const PlacesDialog = ({ visible, filterByUser = false, onClose }: PlacesDialogProps) => {
    const user = useContext<User>(UserContext)
    const [places, setPlaces] = useState<Array<Place> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>()
    const [message, setMessage] = useState<string | null>()
    const [selectedPlace, setSelectedPlace] = useState<string | null>()
    const [placeStatus, setPlaceStatus] = useState<string | null>(PlaceStatus.CREATED.key)
    const { getAuthHeader } = useAuth()

    const fetchPlaces = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(
            filterByUser
                ? endpoints.paginatedAccountPlaces(user.id, nextPageKey, placeStatus)
                : endpoints.paginatedPlaces(nextPageKey, user.isAdmin ? placeStatus : undefined)
        )

        if (response.ok) {
            const jsonResponse = await response.json()
            setPlaces(!places ? jsonResponse.places : places.concat(jsonResponse.places))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError({ message: strings.errorFetchingPlaces })
        }

        setIsFetching(false)
    }, [filterByUser, isFetching, nextPageKey, placeStatus, places, user])

    function reset(keepSelected = false) {
        setPlaces(null)
        setNextPageKey(null)
        setError(null)
        setMessage(null)
        if (!keepSelected) setSelectedPlace(null)
    }

    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && !prevVisible) {
            reset()
        }
    }, [prevVisible, visible])

    const prevStatus = usePrevious(placeStatus)
    useEffect(() => {
        if (placeStatus !== prevStatus) {
            reset()
        }
    }, [prevStatus, placeStatus])

    useEffect(() => {
        if (visible && !places && !error) {
            fetchPlaces()
        }
    }, [error, fetchPlaces, places, visible])

    function openPlace(id: string) {
        setSelectedPlace(id)
    }

    async function deletePlace(id: string, permanent: boolean) {
        setIsProcessing(true)
        setError(null)

        const authHeader = await getAuthHeader(user.walletAddress)

        let url = `${endpoints.place(id)}`
        if (permanent) url = `${url}?permanent=true`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader
            },
            referrerPolicy: 'no-referrer'
        })

        if (response.ok) {
            const jsonResponse = await response.json()
            reset()
            setMessage(
                `${permanent ? strings.placeDeleted : strings.placeArchived}. ${
                    !jsonResponse.contractDeleted ? `${strings.failedDeletingContract}.` : ''
                }`
            )
        } else {
            setError({ message: permanent ? strings.failedDeletingPlace : strings.failedArchivingPlace })
        }

        setIsProcessing(false)
    }

    function fetchMorePlaces() {
        const hasMore = !!nextPageKey
        if (hasMore) fetchPlaces()
    }

    function handleScroll(e: React.UIEvent<HTMLElement>) {
        const margin = 10
        const scroll = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - margin
        const bottom = scroll <= e.currentTarget.clientHeight
        if (bottom && !selectedPlace) {
            fetchMorePlaces()
        }
    }

    function close() {
        if (selectedPlace) {
            setSelectedPlace(null)
        } else onClose()
    }

    function getSelectedPlace() {
        return places?.find(place => place.id === selectedPlace) as Place
    }

    function getTitle() {
        if (selectedPlace) return getSelectedPlace()?.name
        else return filterByUser ? strings.myPlaces : strings.allPlaces
    }

    return (
        <ModalDialog visible={visible} title={getTitle()} onClose={close} onScroll={handleScroll}>
            <div className={styles.container}>
                {(filterByUser || (user && user.isAdmin)) && !selectedPlace && (
                    <DropDownSelector
                        label={strings.status}
                        options={PlaceStatus.list().map(status => ({ key: status.key, value: status.value }))}
                        defaultValue={placeStatus}
                        onSelected={setPlaceStatus}
                    />
                )}
                {!places && !error && (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                    </div>
                )}
                {places && places.length > 0 && !selectedPlace && (
                    <div className={styles.scrollContainer}>
                        {places.map(place => (
                            <PlaceListItem
                                key={place.id}
                                id={place.id}
                                name={place.name}
                                ownerWallet={place.creator}
                                imageUrl={place.offChainImageUrl}
                                onClick={openPlace}
                                onArchive={() => deletePlace(place.id, false)}
                                onDelete={() => deletePlace(place.id, true)}
                            />
                        ))}
                        {isFetching && (
                            <div className={styles.loading}>
                                <LoadingSpinner />
                            </div>
                        )}
                        {!isFetching && !!nextPageKey && (
                            <Button type={ButtonType.OUTLINE} label={strings.showMore} onClick={fetchMorePlaces} />
                        )}
                    </div>
                )}
                {places && places.length === 0 && <div className={styles.empty}>{strings.noPlacesFound}</div>}
                {selectedPlace && <PlaceDetails id={selectedPlace} onUpdate={() => reset(true)} />}
                {(error || message || isProcessing) && (
                    <ActionBar>
                        {error && <div className={styles.error}>{error.message}</div>}
                        {message && <div>{message}</div>}
                        {isProcessing && (
                            <div className={styles.loading}>
                                <LoadingSpinner />
                            </div>
                        )}
                    </ActionBar>
                )}
            </div>
        </ModalDialog>
    )
}

export default PlacesDialog

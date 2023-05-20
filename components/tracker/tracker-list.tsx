import LoadingSpinner from 'components/loading-spinner.js'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import Button, { ButtonType } from 'components/button'
import { Tracker } from 'types/tracker.js'
import TrackerListItem from './tracker-list-item'
import styles from './tracker-list.module.scss'

type TrackerListProps = {
    placeId: string
    onAdd: () => void
}

const TrackerList = ({ placeId, onAdd }: TrackerListProps) => {
    const user = useContext<User>(UserContext)
    const [trackers, setTrackers] = useState<Array<Tracker> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>()

    const fetchTrackers = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.paginatedTrackers(placeId))

        if (response.ok) {
            const jsonResponse = await response.json()
            setTrackers(!trackers ? jsonResponse.trackers : trackers.concat(jsonResponse.trackers))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError(strings.errorFetchingTrackers)
        }

        setIsFetching(false)
    }, [isFetching, placeId, trackers, user])

    useEffect(() => {
        if (!trackers && !error) {
            fetchTrackers()
        }
    }, [error, fetchTrackers, trackers])

    function fetchMoreTrackers() {
        const hasMore = !!nextPageKey
        if (hasMore) fetchTrackers()
    }

    function openTracker() {
        // todo
    }

    return (
        <div className={styles.container}>
            {!trackers && !error && (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            )}
            {trackers && trackers.length > 0 && (
                <div className={styles.scrollContainer}>
                    {trackers.map(tracker => (
                        <TrackerListItem
                            key={tracker.id}
                            id={tracker.id}
                            name={tracker.name}
                            imageUrl={tracker.offChainImageUrl}
                            onClick={openTracker}
                        />
                    ))}
                    {isFetching && (
                        <div className={styles.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    {!isFetching && !!nextPageKey && (
                        <Button type={ButtonType.OUTLINE} label={strings.showMore} onClick={fetchMoreTrackers} />
                    )}
                </div>
            )}
            {trackers && trackers.length === 0 && (
                <div className={styles.empty}>
                    <div>{strings.noTrackersFound}</div>
                    <Button
                        className={styles.button}
                        type={ButtonType.OUTLINE}
                        label={strings.addTracker}
                        onClick={onAdd}
                    />
                </div>
            )}
        </div>
    )
}

export default TrackerList

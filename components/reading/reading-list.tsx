import LoadingSpinner from 'components/loading-spinner.js'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import Button, { ButtonType } from 'components/button'
import styles from './reading-list.module.scss'
import usePrevious from 'hooks/use-previous.js'
import ReadingListItem from './reading-list-item'
import { Reading } from 'types/reading'

type ReadingListProps = {
    trackerId: string
    canAdd: boolean
    bottomScrollCounter: number
    onAdd: () => void
    onConnect: () => void
    onSelect: (id: string) => void
}

const ReadingList = ({ trackerId, bottomScrollCounter, canAdd, onAdd, onConnect, onSelect }: ReadingListProps) => {
    const user = useContext<User>(UserContext)
    const [readings, setReadings] = useState<Array<Reading> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>()

    const fetchReadings = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.paginatedReadings(trackerId, nextPageKey))

        if (response.ok) {
            const jsonResponse = await response.json()
            const jsonReadings = jsonResponse.readings
            setReadings(!readings ? jsonReadings : readings.concat(jsonReadings))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError(strings.errorFetchingReadings)
        }

        setIsFetching(false)
    }, [isFetching, nextPageKey, readings, trackerId, user])

    const fetchMoreReadings = useCallback(async () => {
        const hasMore = !!nextPageKey
        if (hasMore) fetchReadings()
    }, [fetchReadings, nextPageKey])

    useEffect(() => {
        if (!readings && !error) {
            fetchReadings()
        }
    }, [error, fetchReadings, readings])

    const prevScrollCounter = usePrevious(bottomScrollCounter)

    useEffect(() => {
        if (prevScrollCounter && bottomScrollCounter > prevScrollCounter) fetchMoreReadings()
    }, [bottomScrollCounter, fetchMoreReadings, prevScrollCounter])

    return (
        <div className={styles.container}>
            {!readings && !error && (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            )}
            {readings && readings.length > 0 && (
                <div className={styles.scrollContainer}>
                    {readings.map(reading => (
                        <ReadingListItem
                            key={reading.id}
                            id={reading.id}
                            value={reading.value}
                            unit={reading.unit}
                            date={reading.created}
                            type={reading.type}
                            start={reading.start ? parseInt(reading.start) : undefined}
                            end={reading.end ? parseInt(reading.end) : undefined}
                            onClick={() => onSelect(reading.id)}
                        />
                    ))}
                    {isFetching && (
                        <div className={styles.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    {!isFetching && !!nextPageKey && (
                        <Button type={ButtonType.OUTLINE} label={strings.showMore} onClick={fetchMoreReadings} />
                    )}
                </div>
            )}
            {readings && readings.length === 0 && (
                <div className={styles.empty}>
                    <div>{strings.noReadingsFound}</div>
                    {canAdd && (
                        <div className={styles.buttons}>
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.addManualReading}
                                onClick={onAdd}
                            />
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.connectToUtilityApi}
                                onClick={onConnect}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ReadingList

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
import { Icon } from 'components/iconbutton'
import { Label } from 'components/label'
import { DropDownSelector } from 'components/drop-down-selector'
import { ConsumptionCycle } from 'types/consumption'

type ReadingListProps = {
    trackerId: string
    canAdd: boolean
    canDelete: boolean
    bottomScrollCounter: number
    connectedToUtilityApi: boolean
    onAdd: () => void
    onDelete: (type: string) => void
    onConnect: () => void
    onSelect: (id: string) => void
}

const ReadingList = ({
    trackerId,
    bottomScrollCounter,
    canAdd,
    canDelete,
    connectedToUtilityApi,
    onAdd,
    onDelete,
    onConnect,
    onSelect
}: ReadingListProps) => {
    const user = useContext<User>(UserContext)
    const [readings, setReadings] = useState<Array<Reading> | null>(null)
    const [selectedReadingId, setSelectedReadingId] = useState<string | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<string | null>()
    const [readingCycle, setReadingCycle] = useState<string>(ConsumptionCycle.DAILY.key)

    const fetchReadings = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.paginatedReadings(trackerId, nextPageKey, readingCycle))

        if (response.ok) {
            const jsonResponse = await response.json()
            const jsonReadings = jsonResponse.readings
            setReadings(!readings ? jsonReadings : readings.concat(jsonReadings))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError(strings.errorFetchingReadings)
        }

        setIsFetching(false)
    }, [isFetching, nextPageKey, readingCycle, readings, trackerId, user])

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

    const prevReadingCycle = usePrevious(readingCycle)
    useEffect(() => {
        if (prevReadingCycle != readingCycle) setReadings(null)
    }, [prevReadingCycle, readingCycle])

    function selectReading(id: string) {
        setSelectedReadingId(id)
        onSelect(id)
    }

    async function deleteReading(id: string) {
        if (!readings || !selectedReadingId) return

        setIsDeleting(true)

        const response = await fetch(endpoints.reading(id), {
            method: 'DELETE',
            referrerPolicy: 'no-referrer'
        })

        if (response.ok) {
            const deleted = readings.find(reading => reading.id != id)
            if (deleted) {
                setReadings(readings.filter(reading => reading.id != id))
                onDelete(deleted.type)
            }
        } else {
            setError(strings.errorDeletingReading)
        }

        setIsDeleting(false)
    }

    function onReadingCycleChange(cycle: string) {
        setReadingCycle(cycle)
    }

    return (
        <div className={styles.container}>
            <div className={styles.listHeader}>
                <div>
                    <div className={styles.iconLabel}>
                        <Label text={strings.energyUsage} />
                        <div className={`${Icon.CHART} ${styles.icon}`} />
                    </div>
                    {connectedToUtilityApi && (
                        <div className={styles.subLabel}>{`(${strings.connectedToUtilityApi})`}</div>
                    )}
                </div>
                <DropDownSelector
                    label={strings.consumptionCycle}
                    options={ConsumptionCycle.list().map(period => ({ key: period.key, value: period.name }))}
                    defaultValue={ConsumptionCycle.DAILY.key}
                    onSelected={onReadingCycleChange}
                />
            </div>
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
                            cycle={reading.cycle}
                            start={reading.start ? parseInt(reading.start) : undefined}
                            end={reading.end ? parseInt(reading.end) : undefined}
                            selected={reading.id === selectedReadingId}
                            canDelete={canDelete}
                            isDeleting={isDeleting}
                            onClick={() => selectReading(reading.id)}
                            onDelete={deleteReading}
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

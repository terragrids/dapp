import LoadingSpinner from 'components/loading-spinner.js'
import React, { useCallback, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import Button, { ButtonSize, ButtonType } from 'components/button'
import styles from './consumption-list.module.scss'
import usePrevious from 'hooks/use-previous.js'
import { Consumption } from 'types/consumption.js'
import ConsumptionListItem from './consumption-list-item'
import DatePicker from 'components/date-picker/date-picker'
import { getTimeDaysAgo } from 'utils/time-utils'

type ConsumptionListProps = {
    trackerId: string
    unit: string
    bottomScrollCounter: number
    onError: (error: string | null) => void
}

const ConsumptionList = ({ trackerId, unit, bottomScrollCounter, onError }: ConsumptionListProps) => {
    const [consumptions, setConsumptions] = useState<Array<Consumption> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>()
    const [startDate, setStartDate] = useState<number>(getTimeDaysAgo(1).getTime())

    const fetchConsumptions = useCallback(async () => {
        if (isFetching) return
        if (!nextPage) setConsumptions(null)
        setIsFetching(true)
        setError(null)
        onError(null)

        const response = await fetch(endpoints.trackerUtilityConsumption(trackerId, nextPage, startDate))

        if (response.ok) {
            const jsonResponse = await response.json()
            if (nextPage && consumptions) {
                setConsumptions(consumptions.concat(jsonResponse.consumptions))
            } else if (!nextPage || !consumptions) {
                setConsumptions(jsonResponse.consumptions)
            }
            setNextPage(jsonResponse.nextPage)
        } else {
            setError(strings.errorFetchingConsumptions)
            onError(strings.errorFetchingConsumptions)
        }

        setIsFetching(false)
    }, [consumptions, isFetching, nextPage, onError, startDate, trackerId])

    const fetchMoreConsumptions = useCallback(async () => {
        const hasMore = !!nextPage
        if (hasMore) fetchConsumptions()
    }, [fetchConsumptions, nextPage])

    const prevScrollCounter = usePrevious(bottomScrollCounter)
    useEffect(() => {
        if (prevScrollCounter && bottomScrollCounter > prevScrollCounter && !error) fetchMoreConsumptions()
    }, [bottomScrollCounter, error, fetchMoreConsumptions, prevScrollCounter])

    function updateStartDate(timestamp: number) {
        setStartDate(timestamp)
        setNextPage(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <DatePicker className={styles.datePicker} start={startDate} onChange={updateStartDate} />
                <Button
                    className={styles.button}
                    size={ButtonSize.SMALL}
                    label={strings.viewConsumption}
                    disabled={false}
                    onClick={fetchConsumptions}
                />
            </div>

            {isFetching && (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            )}
            {consumptions && consumptions.length > 0 && (
                <div className={styles.scrollContainer}>
                    {consumptions.map(item => (
                        <ConsumptionListItem
                            key={item.start}
                            start={item.start}
                            end={item.end}
                            consumption={item.consumption}
                            unit={unit}
                        />
                    ))}
                    {isFetching && (
                        <div className={styles.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    {!isFetching && !!nextPage && (
                        <Button type={ButtonType.OUTLINE} label={strings.showMore} onClick={fetchMoreConsumptions} />
                    )}
                </div>
            )}
            {consumptions && consumptions.length === 0 && (
                <div className={styles.empty}>
                    <div>{strings.noConsumptionsFound}</div>
                </div>
            )}
        </div>
    )
}

export default ConsumptionList

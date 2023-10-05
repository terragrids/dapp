import LoadingSpinner from 'components/loading-spinner.js'
import React, { useCallback, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import Button, { ButtonSize, ButtonType } from 'components/button'
import styles from './consumption-list.module.scss'
import usePrevious from 'hooks/use-previous.js'
import { Consumption, ConsumptionPeriod } from 'types/consumption'
import ConsumptionListItem from './consumption-list-item'
import DatePicker from 'components/date-picker/date-picker'
import { getStartOfDay, getTimeDaysAgo, getUTCFromLocal } from 'utils/time-utils'
import { ONE_MINUTE } from 'utils/constants'
import { ReadingType } from 'types/reading'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { DropDownSelector } from 'components/drop-down-selector'

type ConsumptionListProps = {
    trackerId: string
    unit: string
    bottomScrollCounter: number
    onImported: (readings: Array<Consumption>) => void
}

function getStartDate(timestamp: number) {
    // Start time must be midnight
    // The provided timestamp is 00:00:01 on the local browser timezone. Let's convert to UTC.
    const utc = getUTCFromLocal(timestamp)

    // To include 00:00 in the api response we need to move back before midnight
    return utc.getTime() - ONE_MINUTE
}

const ConsumptionList = ({ trackerId, unit, bottomScrollCounter, onImported }: ConsumptionListProps) => {
    const [consumptions, setConsumptions] = useState<Array<Consumption> | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isImporting, setIsImporting] = useState<boolean>(false)
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>()
    const [fetchDisabled, setFetchDisabled] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<number>(() => {
        const date = getStartOfDay(getTimeDaysAgo(1).getTime())
        return getStartDate(date.getTime())
    })
    const [selectStartDate, setSelectStartDate] = useState<number | null>()
    const [selectEndDate, setSelectEndDate] = useState<number | null>()
    const [consumptionPeriod, setConsumptionPeriod] = useState<string>(ConsumptionPeriod.DAILY.key)
    const { fetchOrLogin } = useFetchOrLogin()

    const fetchConsumptions = useCallback(
        async (reset = false) => {
            if (isFetching) return
            if (reset || !nextPage) setConsumptions(null)
            setIsFetching(true)
            setError(null)

            const response = await fetch(
                endpoints.trackerUtilityConsumption(
                    trackerId,
                    nextPage,
                    startDate,
                    ConsumptionPeriod.toShort(consumptionPeriod)
                )
            )

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
            }

            setIsFetching(false)
        },
        [consumptionPeriod, consumptions, isFetching, nextPage, startDate, trackerId]
    )

    const fetchMoreConsumptions = useCallback(async () => {
        const hasMore = !!nextPage
        if (hasMore) fetchConsumptions()
    }, [fetchConsumptions, nextPage])

    const prevScrollCounter = usePrevious(bottomScrollCounter)
    useEffect(() => {
        if (prevScrollCounter && bottomScrollCounter > prevScrollCounter && !error) fetchMoreConsumptions()
    }, [bottomScrollCounter, error, fetchMoreConsumptions, prevScrollCounter])

    function updateStartDate(timestamp: number) {
        const date = getStartOfDay(timestamp)
        setStartDate(getStartDate(date.getTime()))
        setNextPage(null)
        setFetchDisabled(false)
    }

    function startFetchingConsumptions() {
        fetchConsumptions(true)
        setFetchDisabled(true)
    }

    function selectItem(start: number) {
        setSelectStartDate(start)
        setSelectEndDate(null)
    }

    function shiftSelectItem(start: number) {
        setSelectEndDate(start)
    }

    function isSelected(start: number) {
        if (!selectStartDate && !selectEndDate) return false
        if (selectStartDate === start) return true
        if (selectStartDate && selectStartDate < start && selectEndDate && selectEndDate >= start) return true
        if (selectStartDate && selectStartDate > start && selectEndDate && selectEndDate <= start) return true
        return false
    }

    function getSelectedItems() {
        return !consumptions ? [] : consumptions.filter(c => isSelected(c.start))
    }

    async function importConsumptions() {
        if (!consumptions) return
        setIsImporting(true)
        setError(null)

        const readings = getSelectedItems()
        const response = await fetchOrLogin(endpoints.readings, {
            method: 'POST',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                trackerId,
                readings: readings.map(reading => ({
                    type: ReadingType.CONSUMPTION,
                    value: reading.consumption.toString(),
                    unit,
                    frequency: consumptionPeriod,
                    start: reading.start.toString(),
                    end: reading.end.toString()
                }))
            })
        })

        if (!response.ok) {
            setError(strings.errorImportingConsumptions)
        } else {
            setConsumptions(consumptions.map(c => ({ ...c, imported: isSelected(c.start) || c.imported })))
            setSelectStartDate(null)
            setSelectEndDate(null)
            onImported(readings)
        }

        setIsImporting(false)
    }

    function onConsumptionPeriodChange(period: string) {
        setConsumptionPeriod(period)
        setNextPage(null)
        setFetchDisabled(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.controls}>
                    <div className={styles.pickers}>
                        <DatePicker
                            className={styles.datePicker}
                            start={startDate}
                            maxDate={new Date()}
                            onChange={updateStartDate}
                        />
                        <DropDownSelector
                            label={strings.consumptionPeriod}
                            options={ConsumptionPeriod.list().map(period => ({ key: period.key, value: period.name }))}
                            defaultValue={ConsumptionPeriod.DAILY.key}
                            onSelected={onConsumptionPeriodChange}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            className={styles.button}
                            size={ButtonSize.SMALL}
                            label={strings.viewConsumption}
                            disabled={fetchDisabled}
                            onClick={startFetchingConsumptions}
                        />
                        <Button
                            className={styles.button}
                            size={ButtonSize.SMALL}
                            label={strings.importConsumption}
                            disabled={getSelectedItems()?.length === 0}
                            loading={isImporting}
                            onClick={importConsumptions}
                        />
                    </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
            </div>

            {(isFetching || isImporting) && (
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
                            selected={isSelected(item.start)}
                            imported={item.imported}
                            onClick={selectItem}
                            onShiftClick={shiftSelectItem}
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

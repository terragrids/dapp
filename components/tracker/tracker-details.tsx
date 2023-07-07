import LoadingSpinner from 'components/loading-spinner.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints, ipfsUrl } from 'utils/api-config.js'
import { Tracker, TrackerType } from 'types/tracker'
import styles from './tracker-details.module.scss'
import { Label } from 'components/label'
import { AssetLink } from 'components/asset-link'
import { cidFromAlgorandAddress } from 'utils/token-utils.js'
import { ReachStdlib, ReachContext } from 'context/reach-context'
import { Icon } from 'components/iconbutton'
import { InputField } from 'components/input-field'
import { Reading } from 'types/reading.js'
import ReadingList from 'components/reading/reading-list'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user.js'
import { ElectricityMeter, ElectricityMeterPoint, GasMeter, GasMeterPoint } from 'types/utility-meter.js'
import { DropDownSelector } from 'components/drop-down-selector'
import Button, { ButtonSize, ButtonType } from 'components/button'
import { UtilityAccount } from 'types/utility-account'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { ONE_SECOND } from 'utils/constants'
import ConsumptionList from 'components/utility/consumption-list'

type TrackerDetailsProps = {
    trackerId: string
    uiStatus: TrackerUiStatus
    trackerTypes: Array<TrackerType>
    bottomScrollCounter: number
    onLoad: (tracker: Tracker) => void
    onManualReadingChange: (reading: Reading) => void
    onAddManualReading: () => void
    onConnectToUtilityApi: () => void
    onUpdating: (inProgress: boolean) => void
    onError: (error: string | null) => void
}

export enum TrackerUiStatus {
    READINGS,
    DETAILS,
    ADD_MANUAL_READING,
    UTILITY_API
}

const meterSelectorPrompt = {
    key: 'none',
    value: strings.selectMeter
}

const TrackerDetails = ({
    trackerId,
    uiStatus,
    trackerTypes,
    bottomScrollCounter,
    onLoad,
    onManualReadingChange,
    onAddManualReading,
    onConnectToUtilityApi,
    onUpdating,
    onError
}: TrackerDetailsProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const user = useContext<User>(UserContext)
    const [tracker, setTracker] = useState<Tracker | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [error, setError] = useState<string | null>()
    const [electricityMeters, setElectricityMeters] = useState<Array<ElectricityMeter> | null>()
    const [gasMeters, setGasMeters] = useState<Array<GasMeter> | null>()
    const [utilityAccount, setUtilityAccount] = useState<UtilityAccount | null>()
    const [electricityMeter, setElectricityMeter] = useState<ElectricityMeter | null>()
    const [gasMeter, setGasMeter] = useState<GasMeter | null>()
    const [accountUpdated, setAccountUpdated] = useState(false)
    const [meterUpdated, setMeterUpdated] = useState(false)
    const { fetchOrLogin } = useFetchOrLogin()

    const fetchTracker = useCallback(
        async (showFetching = true) => {
            if (isFetching) return
            setIsFetching(showFetching)
            setError(null)
            setElectricityMeters(null)
            setElectricityMeter(null)
            setGasMeters(null)
            setGasMeter(null)

            const response = await fetch(endpoints.tracker(trackerId))

            if (response.ok) {
                const {
                    id,
                    name,
                    reserve,
                    created,
                    userId,
                    offChainImageUrl,
                    status,
                    utilityAccountId,
                    meterMpan,
                    meterMprn,
                    meterSerialNumber
                } = await response.json()

                let loadedTracker = {
                    id,
                    name,
                    created: parseInt(created),
                    userId,
                    status,
                    offChainImageUrl,
                    utilityAccountId,
                    ...(meterMpan && { electricityMeter: { mpan: meterMpan, serialNumber: meterSerialNumber } }),
                    ...(meterMprn && { gasMeter: { mprn: meterMprn, serialNumber: meterSerialNumber } })
                } as Tracker

                setUtilityAccount({ id: utilityAccountId } as UtilityAccount)

                setTracker(loadedTracker)

                // Try to fetch NFT metadata and image from IPFS
                try {
                    const cid = cidFromAlgorandAddress(stdlib.algosdk, reserve)
                    const metadataUrl = ipfsUrl(cid)
                    const metadataResponse = await fetch(metadataUrl)

                    if (metadataResponse.ok) {
                        const { name, description, properties } = await metadataResponse.json()
                        setTracker(current => {
                            loadedTracker = {
                                ...current,
                                name,
                                description,
                                type:
                                    trackerTypes.find(type => type.code === properties.placeType.value) ||
                                    TrackerType.ELECTRICITY_METER
                            } as Tracker
                            onLoad(loadedTracker)
                            return loadedTracker
                        })
                    } else {
                        setTracker(current => ({ ...current, type: TrackerType.ELECTRICITY_METER } as Tracker))
                    }
                } catch (e) {}
            } else {
                setTracker(null)
                setError(strings.errorFetchingTracker)
            }

            setIsFetching(false)
        },
        [isFetching, onLoad, stdlib.algosdk, trackerId, trackerTypes]
    )

    useEffect(() => {
        if (!tracker && !error) {
            fetchTracker()
        }
    }, [error, fetchTracker, tracker])

    useEffect(() => {
        onUpdating(inProgress)
    }, [inProgress, onUpdating])

    function getUnit() {
        if (!tracker) return ''
        switch (tracker.type.code) {
            default:
            case 'electricity-meter':
                return 'kWh'
            case 'gas-meter':
                return 'm3'
        }
    }

    function updateReading(value: string) {
        onManualReadingChange({ value: parseInt(value), unit: getUnit() } as Reading)
    }

    function selectReading() {
        // do nothing
    }

    function updateUtilityAccount(id: string) {
        setUtilityAccount(account => ({ ...account, id } as UtilityAccount))
    }

    function updateUtilityApiKey(apiKey: string) {
        setUtilityAccount(account => ({ ...account, apiKey } as UtilityAccount))
    }

    function updateElectricityMeter(serialNumber: string) {
        setElectricityMeter(electricityMeters?.find(meter => meter.serialNumber === serialNumber) as ElectricityMeter)
    }

    function updateGasMeter(serialNumber: string) {
        setGasMeter(gasMeters?.find(meter => meter.serialNumber === serialNumber) as GasMeter)
    }

    useEffect(() => {
        async function fetchUtilityMeters() {
            setIsFetching(true)
            setError(null)

            const response = await fetchOrLogin(endpoints.trackerUtilityMeters(tracker?.id))

            if (response.ok) {
                const { electricityMeterPoints, gasMeterPoints } = await response.json()

                switch (tracker?.type.code) {
                    default:
                    case 'electricity-meter':
                        {
                            const meters = [] as Array<ElectricityMeter>
                            electricityMeterPoints.forEach((point: ElectricityMeterPoint) => {
                                meters.push(
                                    ...point.meters.map(
                                        meter =>
                                            ({ mpan: point.mpan, serialNumber: meter.serialNumber } as ElectricityMeter)
                                    )
                                )
                            })
                            setElectricityMeters(meters)
                            setElectricityMeter(
                                meters.find(meter => meter.serialNumber === tracker?.electricityMeter?.serialNumber)
                            )
                        }
                        break
                    case 'gas-meter':
                        {
                            const meters = [] as Array<GasMeter>
                            gasMeterPoints.forEach((point: GasMeterPoint) => {
                                meters.push(
                                    ...point.meters.map(
                                        meter => ({ mprn: point.mprn, serialNumber: meter.serialNumber } as GasMeter)
                                    )
                                )
                            })
                            setGasMeters(meters)
                            setGasMeter(meters.find(meter => meter.serialNumber === tracker?.gasMeter?.serialNumber))
                        }
                        break
                }
            } else {
                setError(strings.errorFetchingUtilityMeters)
            }

            setIsFetching(false)
        }
        if (tracker && tracker.type && tracker.utilityAccountId && uiStatus === TrackerUiStatus.UTILITY_API) {
            fetchUtilityMeters()
        }
    }, [fetchOrLogin, tracker, uiStatus])

    async function updateTrackerUtilityAccount() {
        if (!utilityAccount || !utilityAccount.id || !utilityAccount.apiKey) return
        setInProgress(true)
        setError(null)

        const response = await fetchOrLogin(endpoints.tracker(tracker?.id), {
            method: 'PUT',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                utilityAccountName: 'Octopus Energy',
                utilityAccountId: utilityAccount.id,
                utilityAccountApiKey: utilityAccount.apiKey
            })
        })

        if (!response.ok) {
            setError(strings.errorUpdatingTracker)
        } else {
            await fetchTracker(false)
            setAccountUpdated(true)
            setTimeout(() => {
                setAccountUpdated(false)
            }, ONE_SECOND)
        }

        setInProgress(false)
    }

    async function removeTrackerUtilityAccount() {
        if (inProgress) return
        setInProgress(true)
        setError(null)

        const response = await fetchOrLogin(endpoints.trackerUtility(tracker?.id), {
            method: 'DELETE',
            referrerPolicy: 'no-referrer'
        })

        if (!response.ok) {
            setError(strings.errorUpdatingTracker)
        } else {
            await fetchTracker(false)
            setAccountUpdated(true)
            setTimeout(() => {
                setAccountUpdated(false)
            }, ONE_SECOND)
        }

        setInProgress(false)
    }

    async function updateTrackerMeter() {
        if (!electricityMeter && !gasMeter) return
        setInProgress(true)
        setError(null)

        const response = await fetchOrLogin(endpoints.tracker(tracker?.id), {
            method: 'PUT',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                ...(electricityMeter && {
                    meterMpan: electricityMeter.mpan,
                    meterSerialNumber: electricityMeter.serialNumber
                }),
                ...(gasMeter && {
                    meterMprn: gasMeter.mprn,
                    meterSerialNumber: gasMeter.serialNumber
                })
            })
        })

        if (!response.ok) {
            setError(strings.errorUpdatingTracker)
        } else {
            setMeterUpdated(true)
            setTimeout(() => {
                setMeterUpdated(false)
            }, ONE_SECOND)
        }

        setInProgress(false)
    }

    function isUtilityAccountValid() {
        return !!utilityAccount && !!utilityAccount.id && !!utilityAccount.apiKey
    }

    function isMeterValid() {
        if (
            electricityMeter &&
            electricityMeter.serialNumber &&
            electricityMeter.serialNumber !== 'none' &&
            electricityMeter.serialNumber !== tracker?.electricityMeter?.serialNumber
        )
            return true
        if (
            gasMeter &&
            gasMeter.serialNumber &&
            gasMeter.serialNumber !== 'none' &&
            gasMeter.serialNumber !== tracker?.gasMeter?.serialNumber
        )
            return true
        return false
    }

    return (
        <div className={styles.container}>
            {!tracker && !error && <LoadingSpinner />}
            {tracker && (
                <>
                    <div className={styles.section}>
                        <Label text={tracker.name} />
                    </div>
                    <div className={`${styles.section} ${styles.image}`}>
                        <img src={tracker.offChainImageUrl} alt={tracker.name} className={styles.image} />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                </>
            )}
            {tracker && uiStatus === TrackerUiStatus.READINGS && (
                <div className={styles.section}>
                    <div className={styles.iconLabel}>
                        <Label text={strings.energyUsage} />
                        <div className={`${Icon.CHART} ${styles.icon}`} />
                    </div>
                    {tracker.utilityAccountId && (
                        <div className={styles.subLabel}>{`(${strings.connectedToUtilityApi})`}</div>
                    )}
                    <ReadingList
                        trackerId={tracker.id}
                        bottomScrollCounter={bottomScrollCounter}
                        canAdd={user && (user.isAdmin || user.id === tracker.userId)}
                        onAdd={onAddManualReading}
                        onConnect={onConnectToUtilityApi}
                        onSelect={selectReading}
                    />
                </div>
            )}
            {tracker && uiStatus === TrackerUiStatus.DETAILS && (
                <>
                    <div className={styles.section}>
                        <Label text={strings.assetID} />
                        <div className={styles.content}>
                            <AssetLink assetId={tracker.id} />
                        </div>
                    </div>
                    {tracker.type && ( // in case ipfs request fails
                        <div className={styles.section}>
                            <Label text={strings.type} />
                            <div className={styles.content}>{tracker.type.name}</div>
                        </div>
                    )}
                    {tracker.utilityAccountId && (
                        <div className={styles.section}>
                            <Label text={strings.utilityAccount} />
                            <div className={styles.content}>{tracker.utilityAccountId}</div>
                        </div>
                    )}
                    <div className={styles.section}>
                        <Label text={strings.created} />
                        <div className={styles.content}>{new Date(tracker.created).toLocaleDateString()}</div>
                    </div>
                </>
            )}
            {tracker && uiStatus === TrackerUiStatus.ADD_MANUAL_READING && (
                <>
                    <div className={styles.section}>
                        <InputField
                            label={strings.formatString(strings.reading, getUnit()) as string}
                            type={'number'}
                            onChange={updateReading}
                        />
                    </div>
                </>
            )}
            {tracker && !isFetching && uiStatus === TrackerUiStatus.UTILITY_API && (
                <>
                    <div className={styles.section}>
                        <div className={styles.notice}>
                            <span>{strings.youCanOnlyConnectToOctopusEnergy} </span>
                            <a href={'https://octopus.energy/about-us/'} target={'_blank'} rel={'noreferrer'}>
                                {strings.learnMore}
                            </a>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.section}>
                            <InputField
                                label={strings.utilityAccount}
                                initialValue={tracker.utilityAccountId}
                                onChange={updateUtilityAccount}
                            />
                        </div>
                        <div className={styles.section}>
                            <InputField
                                label={strings.utilityApiKey}
                                placeholder={'*****'}
                                type={'password'}
                                onChange={updateUtilityApiKey}
                            />
                        </div>

                        <div className={styles.buttons}>
                            <Button
                                className={styles.button}
                                type={ButtonType.FULL}
                                size={ButtonSize.SMALL}
                                label={tracker.utilityAccountId ? strings.updateAccount : strings.connectAccount}
                                disabled={inProgress || !isUtilityAccountValid()}
                                checked={accountUpdated}
                                onClick={updateTrackerUtilityAccount}
                            />
                            {tracker.utilityAccountId && (
                                <div className={styles.link} onClick={removeTrackerUtilityAccount}>
                                    {strings.disconnectAccount}
                                </div>
                            )}
                        </div>
                    </div>

                    {(electricityMeters || gasMeters) && (
                        <>
                            <hr className={styles.separator} />
                            <div className={styles.section}>
                                {electricityMeters && (
                                    <div className={styles.section}>
                                        <DropDownSelector
                                            label={strings.electricityMeter}
                                            defaultValue={electricityMeter?.serialNumber}
                                            options={[
                                                meterSelectorPrompt,
                                                ...electricityMeters.map(meter => ({
                                                    key: meter.serialNumber,
                                                    value: `MPAN: ${meter.mpan}\nS/N: ${meter.serialNumber}`
                                                }))
                                            ]}
                                            onSelected={updateElectricityMeter}
                                        />
                                    </div>
                                )}

                                {gasMeters && (
                                    <div className={styles.section}>
                                        <DropDownSelector
                                            label={strings.gasMeter}
                                            defaultValue={gasMeter?.serialNumber}
                                            options={[
                                                meterSelectorPrompt,
                                                ...gasMeters.map(meter => ({
                                                    key: meter.serialNumber,
                                                    value: `MPRN: ${meter.mprn} S/N: ${meter.serialNumber}`
                                                }))
                                            ]}
                                            onSelected={updateGasMeter}
                                        />
                                    </div>
                                )}

                                <div className={styles.buttons}>
                                    <Button
                                        className={styles.button}
                                        type={ButtonType.FULL}
                                        size={ButtonSize.SMALL}
                                        label={strings.updateMeter}
                                        disabled={inProgress || !isMeterValid()}
                                        checked={meterUpdated}
                                        onClick={updateTrackerMeter}
                                    />
                                    <ConsumptionList
                                        trackerId={tracker.id}
                                        bottomScrollCounter={bottomScrollCounter}
                                        onError={onError}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
            {tracker && isFetching && uiStatus === TrackerUiStatus.UTILITY_API && <LoadingSpinner />}
        </div>
    )
}

export default TrackerDetails

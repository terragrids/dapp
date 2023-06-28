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

type TrackerDetailsProps = {
    trackerId: string
    uiStatus: TrackerUiStatus
    trackerTypes: Array<TrackerType>
    bottomScrollCounter: number
    onLoad: (tracker: Tracker) => void
    onManualReadingChange: (reading: Reading) => void
    onUtilityAccountChange: (account: string) => void
    onUtilityApiKeyChange: (apiKey: string) => void
    onAddManualReading: () => void
    onConnectToUtilityApi: () => void
}

export enum TrackerUiStatus {
    READINGS,
    DETAILS,
    ADD_MANUAL_READING,
    UTILITY_API
}

const TrackerDetails = ({
    trackerId,
    uiStatus,
    trackerTypes,
    bottomScrollCounter,
    onLoad,
    onManualReadingChange,
    onUtilityAccountChange,
    onUtilityApiKeyChange,
    onAddManualReading,
    onConnectToUtilityApi
}: TrackerDetailsProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const user = useContext<User>(UserContext)
    const [tracker, setTracker] = useState<Tracker | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [error, setError] = useState<string | null>()

    const fetchTracker = useCallback(async () => {
        if (isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.tracker(trackerId))

        if (response.ok) {
            const { id, name, reserve, created, userId, offChainImageUrl, status, utilityAccountId } =
                await response.json()

            let loadedTracker = {
                id,
                name,
                created: parseInt(created),
                userId,
                status,
                offChainImageUrl,
                utilityAccountId
            } as Tracker

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
            setError(strings.errorFetchingTracker)
        }

        setIsFetching(false)
    }, [isFetching, onLoad, stdlib.algosdk, trackerId, trackerTypes])

    useEffect(() => {
        if (!tracker && !error) {
            fetchTracker()
        }
    }, [error, fetchTracker, tracker])

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

    function updateUtilityAccount(account: string) {
        onUtilityAccountChange(account)
    }

    function updateUtilityApiKey(apiKey: string) {
        onUtilityApiKeyChange(apiKey)
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
                </>
            )}
            {tracker && uiStatus === TrackerUiStatus.READINGS && (
                <>
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
                </>
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
            {tracker && uiStatus === TrackerUiStatus.UTILITY_API && (
                <>
                    <div className={styles.section}>
                        <InputField
                            label={strings.utilityAccount}
                            initialValue={tracker.utilityAccountId}
                            onChange={updateUtilityAccount}
                        />
                    </div>
                    <div className={styles.section}>
                        <InputField label={strings.utilityApiKey} onChange={updateUtilityApiKey} />
                    </div>
                </>
            )}
        </div>
    )
}

export default TrackerDetails

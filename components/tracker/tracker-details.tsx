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

type TrackerDetailsProps = {
    trackerId: string
    uiStatus: TrackerUiStatus
    trackerTypes: Array<TrackerType>
}

export enum TrackerUiStatus {
    READINGS,
    DETAILS
}

const TrackerDetails = ({ trackerId, uiStatus, trackerTypes }: TrackerDetailsProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const [tracker, setTracker] = useState<Tracker | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [error, setError] = useState<string | null>()

    const fetchTracker = useCallback(async () => {
        if (isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.tracker(trackerId))

        if (response.ok) {
            const { id, name, reserve, created, userId, offChainImageUrl, status } = await response.json()
            setTracker({
                id,
                name,
                created: parseInt(created),
                userId,
                status,
                offChainImageUrl
            } as Tracker)

            // Try to fetch NFT metadata and image from IPFS
            try {
                const cid = cidFromAlgorandAddress(stdlib.algosdk, reserve)
                const metadataUrl = ipfsUrl(cid)
                const metadataResponse = await fetch(metadataUrl)

                if (metadataResponse.ok) {
                    const { name, description, properties } = await metadataResponse.json()
                    setTracker(
                        current =>
                            ({
                                ...current,
                                name,
                                description,
                                type:
                                    trackerTypes.find(type => type.code === properties.placeType.value) ||
                                    TrackerType.ELECTRICITY_METER
                            } as Tracker)
                    )
                } else {
                    setTracker(current => ({ ...current, type: TrackerType.ELECTRICITY_METER } as Tracker))
                }
            } catch (e) {}
        } else {
            setError(strings.errorFetchingTracker)
        }

        setIsFetching(false)
    }, [isFetching, stdlib.algosdk, trackerId, trackerTypes])

    useEffect(() => {
        if (!tracker && !error) {
            fetchTracker()
        }
    }, [error, fetchTracker, tracker])

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
                        <Label text={strings.readings} />
                        <div className={`${Icon.CHART} ${styles.icon}`} />
                    </div>
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
                    <div className={styles.section}>
                        <Label text={strings.created} />
                        <div className={styles.content}>{new Date(tracker.created).toLocaleDateString()}</div>
                    </div>
                    {tracker.type && ( // in case ipfs request fails
                        <div className={styles.section}>
                            <Label text={strings.type} />
                            <div className={styles.content}>{tracker.type.name}</div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default TrackerDetails

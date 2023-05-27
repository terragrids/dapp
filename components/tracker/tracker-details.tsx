import LoadingSpinner from 'components/loading-spinner.js'
import React, { useCallback, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import { Tracker } from 'types/tracker.js'
import styles from './tracker-details.module.scss'
import { Label } from 'components/label'

type TrackerDetailsProps = {
    trackerId: string
}

const TrackerDetails = ({ trackerId }: TrackerDetailsProps) => {
    const [tracker, setTracker] = useState<Tracker | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [error, setError] = useState<string | null>()

    const fetchTracker = useCallback(async () => {
        if (isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(endpoints.tracker(trackerId))

        if (response.ok) {
            setTracker(await response.json())
        } else {
            setError(strings.errorFetchingTracker)
        }

        setIsFetching(false)
    }, [isFetching, trackerId])

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
        </div>
    )
}

export default TrackerDetails

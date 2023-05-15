import ActionBar from 'components/action-bar'
import { AssetLink } from 'components/asset-link'
import Button, { ButtonType } from 'components/button'
import { DropDownSelector } from 'components/drop-down-selector'
import { InputField } from 'components/input-field'
import { Label } from 'components/label'
import LoadingSpinner from 'components/loading-spinner.js'
import { ParagraphMaker } from 'components/paragraph-maker/paragraph-maker'
import { ReachContext, ReachStdlib } from 'context/reach-context'
import { UserContext } from 'context/user-context'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { useFilePinner } from 'hooks/use-file-pinner'
import { User } from 'hooks/use-user.js'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { strings } from 'strings/en.js'
import { setTimeout } from 'timers'
import { PlaceStatus, PlaceType } from 'types/place'
import { endpoints, ipfsUrl, terragridsImageUrl } from 'utils/api-config.js'
import { ONE_SECOND } from 'utils/constants'
import { getHashFromIpfsUrl } from 'utils/string-utils.js'
import { cidFromAlgorandAddress } from 'utils/token-utils.js'
import styles from './place-details.module.scss'
import IconButton, { Icon, IconButtonType } from 'components/iconbutton'
import { Tracker, TrackerType } from 'types/tracker'

type PlaceDetailsProps = {
    id: string
    onFetchName: (name: string) => void
    onUpdateName: (name: string) => void
    onApprove: () => void
    onArchive: () => void
}

type Details = {
    id: string
    name: string
    created: number
    userId: string
    offChainImageUrl: string
    description: string
    status: string
    type: PlaceType
    positionX: number
    positionY: number
}

export type UpdatedDetails = {
    name: string
    description: string
    type: PlaceType
}

enum UiStatus {
    VIEW,
    EDIT,
    ADD_TRACKER
}

const defaultTracker = {
    name: '',
    type: TrackerType.list()[0]
} as Tracker

const PlaceDetails = ({ id, onFetchName, onUpdateName, onApprove, onArchive }: PlaceDetailsProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const user = useContext<User>(UserContext)
    const [place, setPlace] = useState<Details | null>()
    const [newTracker, setNewTracker] = useState<Tracker>(defaultTracker)
    const [updatedPlace, setUpdatedPlace] = useState<UpdatedDetails>({} as UpdatedDetails)
    const [error, setError] = useState<string | null>(null)
    const [uiStatus, setUiStatus] = useState<UiStatus>(UiStatus.VIEW)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)
    const { fetchOrLogin } = useFetchOrLogin()
    const { pinFileToIpfs } = useFilePinner()
    const placeTypes = useRef<Array<PlaceType>>([])
    const trackerTypes = useRef<Array<TrackerType>>([])
    const placeFetched = useRef(false)

    const fetchPlace = useCallback(async () => {
        if (!id) return
        setError(null)

        const response = await fetch(endpoints.place(id))

        if (response.ok) {
            const { id, name, reserve, created, userId, offChainImageUrl, status, positionX, positionY } =
                await response.json()

            let placeName = name

            setPlace(current => ({
                ...(current as Details),
                id,
                name,
                created: parseInt(created),
                userId,
                status,
                offChainImageUrl,
                positionX,
                positionY
            }))

            // Try to fetch NFT metadata and image from IPFS
            try {
                const cid = cidFromAlgorandAddress(stdlib.algosdk, reserve)
                const metadataUrl = ipfsUrl(cid)
                const metadataResponse = await fetch(metadataUrl)

                if (metadataResponse.ok) {
                    const { name, description, properties } = await metadataResponse.json()
                    placeName = name
                    setPlace(
                        current =>
                            ({
                                ...current,
                                name,
                                description,
                                type:
                                    placeTypes.current.find(type => type.code === properties.placeType.value) ||
                                    PlaceType.TRADITIONAL_HOUSE
                            } as Details)
                    )
                } else {
                    setPlace(current => ({ ...current, type: PlaceType.TRADITIONAL_HOUSE } as Details))
                }

                onFetchName(placeName)
                setInProgress(false)
            } catch (e) {}
        } else {
            setError(strings.errorFetchingPlace)
        }
    }, [id, onFetchName, stdlib.algosdk])

    async function approve() {
        setError(null)
        setInProgress(true)
        try {
            const response = await fetchOrLogin(endpoints.placeApproval(id), {
                method: 'PUT',
                referrerPolicy: 'no-referrer'
            })

            if (response.ok) {
                await fetchPlace()
                onApprove()
            } else {
                throw new Error()
            }
        } catch (e) {
            setError(strings.errorApprovingPlace)
            setInProgress(false)
        }
    }

    async function archive() {
        setError(null)
        setInProgress(true)

        const response = await fetchOrLogin(endpoints.place(id), {
            method: 'DELETE',
            referrerPolicy: 'no-referrer'
        })

        if (response.ok) {
            await fetchPlace()
            onArchive()
        } else {
            setInProgress(false)
            setError(strings.errorArchivingPlace)
        }
    }

    useEffect(() => {
        async function fetchMedia() {
            const [responsePlace, responseTracker] = await Promise.all([
                fetch(endpoints.media('place', 1)),
                fetch(endpoints.media('tracker', 1))
            ])

            if (!responsePlace.ok || !responseTracker.ok) {
                setError(strings.errorFetchingPlace)
                return
            }

            const { media: placeMedia } = await responsePlace.json()
            placeTypes.current = PlaceType.newPlaceTypesFromMediaItems(placeMedia)
            const { media: trackerMedia } = await responseTracker.json()
            trackerTypes.current = TrackerType.newTrackerTypesFromMediaItems(trackerMedia)
        }

        setUiStatus(UiStatus.VIEW)
        fetchMedia()
    }, [])

    useEffect(() => {
        if (!placeFetched.current) {
            placeFetched.current = true
            fetchPlace()
        }
    }, [fetchPlace])

    function canEdit() {
        return user && place && (user.isAdmin || user.id === place.userId) ? true : false
    }

    async function edit() {
        if (!place) return

        setUpdatedPlace({
            name: place.name,
            description: place.description,
            type: place.type
        })

        setError(null)
        setUiStatus(UiStatus.EDIT)
        setDone(false)
    }

    function setName(name: string) {
        setUpdatedPlace(place => ({
            ...place,
            name
        }))
    }

    function setType(mediaId: string) {
        setUpdatedPlace(place => ({
            ...place,
            type: placeTypes.current.find(type => type.mediaId === mediaId) || PlaceType.TRADITIONAL_HOUSE
        }))
    }

    function setDescription(description: string) {
        setUpdatedPlace(place => ({
            ...place,
            description
        }))
    }

    function isUpdateValid() {
        return !!updatedPlace.name && !!updatedPlace.description
    }

    function isUpdateInProgress() {
        return inProgress && error === null
    }

    async function update() {
        setError(null)
        setInProgress(true)

        try {
            const { name, ipfsMetadataUrl, offChainImageUrl } = await pinFileToIpfs({
                id: updatedPlace.type.mediaId,
                name: updatedPlace.name,
                description: updatedPlace.description,
                properties: { type: updatedPlace.type }
            })

            const response = await fetchOrLogin(endpoints.place(id), {
                method: 'PUT',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    name,
                    cid: getHashFromIpfsUrl(ipfsMetadataUrl),
                    offChainImageUrl
                })
            })

            if (!response.ok) {
                setError(strings.errorUpdatingPlace)
            } else {
                await fetchPlace()
                setDone(true)
                setTimeout(() => {
                    setUiStatus(UiStatus.VIEW)
                    setDone(false)
                    onUpdateName(updatedPlace.name)
                }, ONE_SECOND)
            }
        } catch (e) {
            setError(strings.errorUpdatingPlace)
        }
        setInProgress(false)
    }

    function setNewTrackerType(mediaId: string) {
        setNewTracker(
            tracker =>
                ({
                    ...tracker,
                    type: trackerTypes.current.find(type => type.mediaId === mediaId) || TrackerType.ELECTRICITY_METER
                } as Tracker)
        )
    }

    async function addTracker() {
        // TODO
    }

    return (
        <>
            <div className={styles.container}>
                {!place && !error && <LoadingSpinner />}
                {place && uiStatus === UiStatus.VIEW && (
                    <>
                        <div className={`${styles.section} ${styles.image}`}>
                            <img src={place.offChainImageUrl} alt={place.name} className={styles.image} />
                        </div>
                        <div className={styles.section}>
                            <Label text={strings.assetID} />
                            <div className={styles.content}>
                                <AssetLink assetId={place.id} />
                            </div>
                        </div>
                        <div className={styles.section}>
                            <Label text={strings.created} />
                            <div className={styles.content}>{new Date(place.created).toLocaleDateString()}</div>
                        </div>
                        {place.type && ( // in case ipfs request fails
                            <div className={styles.section}>
                                <Label text={strings.type} />
                                <div className={styles.content}>{place.type.name}</div>
                            </div>
                        )}
                        <div className={styles.section}>
                            <Label text={strings.mapPosition} />
                            <div className={styles.content}>{`(${place.positionX},${place.positionY})`}</div>
                        </div>
                        <div className={styles.section}>
                            <Label text={strings.approvalStatus} />
                            <div className={styles.content}>{PlaceStatus.getByKey(place.status)}</div>
                        </div>
                        {place.description && ( // in case ipfs request fails
                            <div className={styles.section}>
                                <Label text={strings.description} />
                                <div className={styles.content}>
                                    <ParagraphMaker text={place.description} />
                                </div>
                            </div>
                        )}
                    </>
                )}
                {place && uiStatus === UiStatus.EDIT && (
                    <>
                        <div className={styles.section}>
                            <InputField initialValue={place.name} label={strings.name} onChange={setName} />
                        </div>
                        <div className={styles.section}>
                            <DropDownSelector
                                label={strings.whatTypeOfPlace}
                                options={placeTypes.current.map(type => ({ key: type.mediaId, value: type.name }))}
                                defaultValue={updatedPlace.type.mediaId}
                                onSelected={setType}
                            />
                        </div>
                        <div className={`${styles.section} ${styles.image}`}>
                            <img
                                src={terragridsImageUrl(updatedPlace.type.mediaId)}
                                alt={place.name}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.section}>
                            <InputField
                                initialValue={place.description}
                                multiline
                                max={5000}
                                rows={10}
                                label={strings.description}
                                onChange={setDescription}
                            />
                        </div>
                    </>
                )}
                {place && uiStatus === UiStatus.ADD_TRACKER && (
                    <>
                        <div className={styles.section}>
                            <InputField label={strings.giveMemorableTrackerName} onChange={setName} />
                        </div>
                        <div className={styles.section}>
                            <DropDownSelector
                                label={strings.whatTypeOfTracker}
                                options={trackerTypes.current.map(type => ({ key: type.mediaId, value: type.name }))}
                                defaultValue={trackerTypes.current[0].mediaId}
                                onSelected={setNewTrackerType}
                            />
                        </div>
                        <div className={`${styles.section} ${styles.image} ${styles.trackerImage}`}>
                            <img
                                src={terragridsImageUrl(newTracker.type.mediaId || trackerTypes.current[0].mediaId)}
                                alt={'image'}
                            />
                        </div>
                    </>
                )}
            </div>
            {canEdit() && (
                <ActionBar>
                    {error && <div className={styles.error}>{error}</div>}
                    {uiStatus === UiStatus.VIEW && !inProgress && (
                        <div className={styles.buttonContainer}>
                            <IconButton
                                icon={Icon.EDIT}
                                tooltip={strings.edit}
                                type={IconButtonType.OUTLINE}
                                onClick={edit}
                            />
                            <IconButton
                                icon={Icon.ADD}
                                tooltip={strings.addTracker}
                                type={IconButtonType.OUTLINE}
                                onClick={() => setUiStatus(UiStatus.ADD_TRACKER)}
                            />
                            {user && user.isAdmin && place && place.status !== PlaceStatus.APPROVED.key && (
                                <IconButton
                                    icon={Icon.CHECK}
                                    tooltip={strings.approve}
                                    type={IconButtonType.OUTLINE}
                                    onClick={approve}
                                />
                            )}
                            {user && user.isAdmin && place && place.status !== PlaceStatus.ARCHIVED.key && (
                                <IconButton
                                    icon={Icon.ARCHIVE}
                                    tooltip={strings.archive}
                                    type={IconButtonType.OUTLINE}
                                    onClick={archive}
                                />
                            )}
                        </div>
                    )}
                    {uiStatus === UiStatus.VIEW && inProgress && <LoadingSpinner />}
                    {uiStatus === UiStatus.EDIT && (
                        <div className={styles.buttonContainer}>
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.update}
                                disabled={!isUpdateValid()}
                                loading={isUpdateInProgress()}
                                checked={done}
                                onClick={update}
                            />
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.cancel}
                                disabled={isUpdateInProgress()}
                                checked={done}
                                onClick={() => setUiStatus(UiStatus.VIEW)}
                            />
                        </div>
                    )}
                    {uiStatus === UiStatus.ADD_TRACKER && (
                        <div className={styles.buttonContainer}>
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.addTracker}
                                loading={isUpdateInProgress()}
                                checked={done}
                                onClick={addTracker}
                            />
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.cancel}
                                disabled={isUpdateInProgress()}
                                checked={done}
                                onClick={() => setUiStatus(UiStatus.VIEW)}
                            />
                        </div>
                    )}
                </ActionBar>
            )}
        </>
    )
}

export default PlaceDetails

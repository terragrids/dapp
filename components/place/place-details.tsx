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

type PlaceDetailsProps = {
    id: string
    onUpdate: (place: UpdatedDetails) => void
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

const PlaceDetails = ({ id, onUpdate }: PlaceDetailsProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const user = useContext<User>(UserContext)
    const [place, setPlace] = useState<Details | null>()
    const [updatedPlace, setUpdatedPlace] = useState<UpdatedDetails>({} as UpdatedDetails)
    const [error, setError] = useState<string | null>(null)
    const [editing, setEditing] = useState<boolean>(false)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)
    const { fetchOrLogin } = useFetchOrLogin()
    const { pinFileToIpfs } = useFilePinner()
    const placeTypes = useRef<Array<PlaceType>>([])

    const fetchPlace = useCallback(async () => {
        if (!id) return
        setError(null)

        const response = await fetch(endpoints.place(id))

        if (response.ok) {
            const { id, name, reserve, created, userId, offChainImageUrl, status, positionX, positionY } =
                await response.json()

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

                setInProgress(false)
            } catch (e) {}
        } else {
            setError(strings.errorFetchingPlace)
        }
    }, [id, stdlib.algosdk])

    const approvePlace = useCallback(async () => {
        setError(null)
        setInProgress(true)
        try {
            const response = await fetch(endpoints.placeApproval(id), {
                method: 'PUT',
                referrerPolicy: 'no-referrer'
            })

            if (response.ok) {
                fetchPlace()
            } else {
                throw new Error()
            }
        } catch (e) {
            setError(strings.errorApprovingPlace)
            setInProgress(false)
        }
    }, [fetchPlace, id])

    useEffect(() => {
        async function fetchMedia() {
            const response = await fetch(endpoints.media('place', 1))
            if (response.ok) {
                const { media } = await response.json()
                const types = PlaceType.newPlaceTypesFromMediaItems(media)
                placeTypes.current = types
                fetchPlace()
            }
        }

        setEditing(false)
        fetchMedia()
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
        setEditing(true)
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

    async function submit() {
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
                onUpdate(updatedPlace)
                setTimeout(() => setEditing(false), ONE_SECOND)
            }
        } catch (e) {
            setError(strings.errorUpdatingPlace)
        }
        setInProgress(false)
    }

    return (
        <>
            <div className={styles.container}>
                {!place && !error && <LoadingSpinner />}
                {place && !editing && (
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
                {place && editing && (
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
            </div>
            {canEdit() && (
                <ActionBar>
                    {error && <div className={styles.error}>{error}</div>}
                    {!editing && !inProgress && (
                        <div className={styles.buttonContainer}>
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={strings.edit}
                                onClick={edit}
                            />
                            {user && user.isAdmin && place && place.status !== PlaceStatus.APPROVED.key && (
                                <Button
                                    className={styles.button}
                                    type={ButtonType.OUTLINE}
                                    label={strings.approve}
                                    onClick={approvePlace}
                                />
                            )}
                        </div>
                    )}
                    {!editing && inProgress && <LoadingSpinner />}
                    {editing && (
                        <Button
                            className={styles.button}
                            type={ButtonType.OUTLINE}
                            label={strings.update}
                            disabled={!isUpdateValid()}
                            loading={isUpdateInProgress()}
                            checked={done}
                            onClick={submit}
                        />
                    )}
                </ActionBar>
            )}
        </>
    )
}

export default PlaceDetails

import ActionBar from 'components/action-bar'
import Button, { ButtonType } from 'components/button'
import { DropDownSelector } from 'components/drop-down-selector'
import { InputField } from 'components/input-field'
import { Label } from 'components/label'
import LoadingSpinner from 'components/loading-spinner.js'
import { Position2D } from 'components/map/plot.js'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { useFilePinner } from 'hooks/use-file-pinner'
import usePrevious from 'hooks/use-previous.js'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { setTimeout } from 'timers'
import { PlaceType } from 'types/place'
import { endpoints, terragridsImageUrl } from 'utils/api-config.js'
import { ONE_SECOND } from 'utils/constants'
import { getHashFromIpfsUrl } from 'utils/string-utils.js'
import styles from './create-place-dialog.module.scss'

type CreatePlaceDialogProps = {
    visible: boolean
    position: Position2D
    onClose: () => void
    onCreate: () => void
}

type PlaceDetails = {
    name: string
    description: string
    type: PlaceType
}

const defaultPlace = {
    name: '',
    description: '',
    type: PlaceType.list()[0]
} as PlaceDetails

const CreatePlaceDialog = ({ visible, position, onClose, onCreate }: CreatePlaceDialogProps) => {
    const user = useContext<User>(UserContext)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)
    const [place, setPlace] = useState<PlaceDetails>(defaultPlace as PlaceDetails)
    const [error, setError] = useState<string>('')
    const [placeTypes, setPlaceTypes] = useState<Array<PlaceType>>([])
    const { pinFileToIpfs } = useFilePinner()
    const { fetchOrLogin } = useFetchOrLogin()

    const setPlaceType = useCallback(
        (mediaId: string) => {
            setPlace(place => ({
                ...place,
                type: placeTypes.find(type => type.mediaId === mediaId) || PlaceType.TRADITIONAL_HOUSE
            }))
        },
        [placeTypes]
    )

    /**
     * Reset state when opening the dialog
     */
    const prevVisible = usePrevious(visible)
    useEffect(() => {
        async function fetchMedia() {
            const response = await fetch(endpoints.media('place', 1))
            if (response.ok) {
                const { media } = await response.json()
                const types = PlaceType.newPlaceTypesFromMediaItems(media)
                setPlaceTypes(types)
                setPlace(place => ({ ...place, type: types[0] }))
            }
        }

        if (visible && prevVisible === false) {
            setPlace(defaultPlace)
            setError('')
            setInProgress(false)
            setDone(false)
            fetchMedia()
        }
    }, [prevVisible, setPlaceType, visible])

    function setName(name: string) {
        setPlace(place => ({ ...place, name }))
    }

    function setDescription(description: string) {
        setPlace(place => ({ ...place, description }))
    }

    function isValid() {
        return !!place.name && !!place.type && !!place.description
    }

    function isInProgress() {
        const failed = error !== ''
        return !failed && inProgress
    }

    async function submit() {
        setInProgress(true)

        try {
            const { name, ipfsMetadataUrl, offChainImageUrl } = await pinFileToIpfs({
                id: place.type.mediaId,
                name: place.name,
                description: place.description,
                properties: { type: place.type }
            })

            const response = await fetchOrLogin(endpoints.places, {
                method: 'POST',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    name,
                    cid: getHashFromIpfsUrl(ipfsMetadataUrl),
                    offChainImageUrl,
                    positionX: position.x,
                    positionY: position.y
                })
            })

            if (!response.ok) {
                setError(strings.errorCreatingPlace)
            } else {
                if (user.walletAccount) {
                    const { tokenId } = await response.json()
                    await user.walletAccount.tokenAccept(tokenId)
                }
                setDone(true)
                setTimeout(onCreate, ONE_SECOND)
            }
        } catch (e) {
            setError(strings.errorCreatingPlace)
        }
        setInProgress(false)
    }

    return (
        <ModalDialog visible={visible} title={strings.createPlace} onClose={onClose}>
            <div className={styles.container}>
                {position && (
                    <div className={styles.section}>
                        {strings.formatString(strings.createNewPlaceAtNode, position.x, position.y)}
                    </div>
                )}
                {!placeTypes.length && <LoadingSpinner />}
                {placeTypes.length > 0 && (
                    <>
                        <div className={styles.section}>
                            <InputField label={strings.giveMemorablePlaceName} onChange={setName} />
                        </div>
                        <div className={styles.section}>
                            <DropDownSelector
                                label={strings.whatTypeOfPlace}
                                options={placeTypes.map(type => ({ key: type.mediaId, value: type.name }))}
                                defaultValue={placeTypes[0].mediaId}
                                onSelected={setPlaceType}
                            />
                        </div>
                        <div className={styles.section}>
                            <Label text={strings.howToSeePlaceOnMap} />
                            <img src={terragridsImageUrl(place.type.mediaId || placeTypes[0].mediaId)} alt={'image'} />
                        </div>
                        <div className={styles.section}>
                            <InputField
                                max={5000}
                                multiline
                                label={strings.describeYourPlace}
                                onChange={setDescription}
                            />
                        </div>
                        <ActionBar>
                            {error && <div className={styles.error}>{error}</div>}
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                disabled={!isValid()}
                                label={strings.create}
                                loading={isInProgress()}
                                checked={done}
                                onClick={submit}
                            />
                        </ActionBar>
                    </>
                )}
            </div>
        </ModalDialog>
    )
}

export default CreatePlaceDialog

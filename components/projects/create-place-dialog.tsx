import ActionBar from 'components/action-bar'
import Button, { ButtonType } from 'components/button'
import { DropDownSelector } from 'components/drop-down-selector'
import { InputField } from 'components/input-field'
import { Label } from 'components/label'
import { Position2D } from 'components/map/plots/plot.js'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context.js'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { useFilePinner } from 'hooks/use-file-pinner'
import usePrevious from 'hooks/use-previous.js'
import { User } from 'hooks/use-user.js'
import React, { useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { Place } from 'types/place'
import { endpoints, terragridsImageUrl } from 'utils/api-config.js'
import { getHashFromIpfsUrl } from 'utils/string-utils.js'
import styles from './create-place-dialog.module.scss'

type CreatePlaceDialogProps = {
    visible: boolean
    position: Position2D
    onClose: () => void
}

type PlaceDetails = {
    name: string
    description: string
    type: Place
}

const defaultPlace = {
    name: '',
    description: '',
    type: Place.list()[0]
} as PlaceDetails

const CreatePlaceDialog = ({ visible, position, onClose }: CreatePlaceDialogProps) => {
    const user = useContext<User>(UserContext)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [place, setPlace] = useState<PlaceDetails>(defaultPlace as PlaceDetails)
    const [error, setError] = useState<string>('')
    const { pinFileToIpfs } = useFilePinner()
    const { fetchOrLogin } = useFetchOrLogin()

    /**
     * Reset state when opening the dialog
     */
    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && prevVisible === false) {
            setPlace(defaultPlace)
            setError('')
            setInProgress(false)
        }
    }, [prevVisible, visible])

    function setName(name: string) {
        setPlace(place => ({ ...place, name }))
    }

    function setDescription(description: string) {
        setPlace(place => ({ ...place, description }))
    }

    function setPlaceType(code: string) {
        setPlace(place => ({ ...place, type: Place.new(code) }))
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
            const { assetName, ipfsMetadataUrl, offChainImageUrl } = await pinFileToIpfs({
                id: '1cbeb62a-935d-434e-875d-f17c9f5a2d4c', // TODO replace with selected id
                name: place.name,
                description: place.description,
                properties: { type: place.type }
            })

            const response = await fetchOrLogin(endpoints.places, {
                method: 'POST',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    name: assetName,
                    cid: getHashFromIpfsUrl(ipfsMetadataUrl),
                    offChainImageUrl
                })
            })

            if (!response.ok) {
                setError(strings.errorCreatingPlace)
            } else if (user.walletAccount) {
                const { tokenId } = await response.json()
                await user.walletAccount.tokenAccept(tokenId)
                onClose()
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
                <div className={styles.section}>
                    <InputField label={strings.giveMemorablePlaceName} onChange={setName} />
                </div>
                <div className={styles.section}>
                    <DropDownSelector
                        label={strings.whatTypeOfPlace}
                        options={Place.list().map(place => ({ key: place.code, value: place.name }))}
                        onSelected={setPlaceType}
                    />
                </div>
                <div className={styles.section}>
                    <Label text={strings.howToSeePlaceOnMap} />
                    <img src={terragridsImageUrl('1cbeb62a-935d-434e-875d-f17c9f5a2d4c')} alt={'image'} />
                </div>
                <div className={styles.section}>
                    <InputField max={5000} multiline label={strings.describeYourPlace} onChange={setDescription} />
                </div>
                <ActionBar>
                    <Button
                        className={styles.button}
                        type={ButtonType.OUTLINE}
                        disabled={!isValid()}
                        label={strings.create}
                        loading={isInProgress()}
                        checked={false}
                        onClick={submit}
                    />
                </ActionBar>
                <div className={styles.section}>
                    <div className={styles.error}>{error}</div>
                </div>
            </div>
        </ModalDialog>
    )
}

export default CreatePlaceDialog

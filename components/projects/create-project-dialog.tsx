import ActionBar from 'components/action-bar'
import Button, { ButtonType } from 'components/button'
import { DropDownSelector } from 'components/drop-down-selector'
import { ImageUploader } from 'components/image-uploader'
import { InputField } from 'components/input-field'
import { Label } from 'components/label'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context.js'
import { useAuth } from 'hooks/use-auth.js'
import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import usePrevious from 'hooks/use-previous.js'
import { User } from 'hooks/use-user.js'
import React, { useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { Place } from 'types/place'
import { endpoints } from 'utils/api-config.js'
import { getHashFromIpfsUrl } from 'utils/string-utils.js'
import styles from './create-project-dialog.module.scss'

type CreateProjectDialogProps = {
    visible: boolean
    onClose: () => void
}

type Project = {
    name: string
    description: string
    type: string
}

const defaultProject = {
    name: '',
    description: '',
    type: Place.list()[0].code
} as Project

const CreateProjectDialog = ({ visible, onClose }: CreateProjectDialogProps) => {
    const user = useContext<User>(UserContext)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [file, setFile] = useState<File>()
    const [project, setProject] = useState<Project>(defaultProject as Project)
    const [error, setError] = useState<string>('')
    const {
        upload,
        uploadState,
        fileProps,
        reset: resetFileUploader
    } = useFileUploader({
        name: project.name,
        description: project.description,
        properties: { placeType: project.type }
    })

    const { getAuthHeader } = useAuth()

    /**
     * Reset state when opening the dialog
     */
    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && prevVisible === false) {
            resetFileUploader()
            setProject(defaultProject)
            setError('')
            setInProgress(false)
        }
    }, [prevVisible, resetFileUploader, visible])

    function setName(name: string) {
        setProject(project => ({ ...project, name }))
    }

    function setDescription(description: string) {
        setProject(project => ({ ...project, description }))
    }

    function setPlaceType(code: string) {
        setProject(project => ({ ...project, type: code }))
    }

    function isValid() {
        return file && !!project.name && !!project.description && !!project.type
    }

    function isInProgress() {
        const failed = uploadState === FileUploadState.ERROR || error !== ''
        return !failed && inProgress
    }

    /**
     * 1. Save project file on S3 and IPFS
     */
    function submit() {
        if (!file) return
        setInProgress(true)
        upload(file)
    }

    /**
     * 2. Create a project on the blockchain
     */
    const prevUploadState = usePrevious(uploadState)
    useEffect(() => {
        async function saveProject() {
            try {
                const response = await fetch(endpoints.projects, {
                    method: 'POST',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        name: fileProps.name,
                        cid: getHashFromIpfsUrl(fileProps.ipfsMetadataUrl),
                        offChainImageUrl: fileProps.offChainUrl
                    })
                })

                if (response.status !== 201) {
                    setError(strings.errorCreatingProject)
                } else if (user.walletAccount) {
                    const { tokenId } = await response.json()
                    await user.walletAccount.tokenAccept(tokenId)
                    onClose()
                }
            } catch (e) {
                setError(strings.errorCreatingProject)
            }
            setInProgress(false)
        }

        if (uploadState === FileUploadState.PINNED && prevUploadState !== FileUploadState.PINNED) {
            saveProject()
        } else if (uploadState === FileUploadState.ERROR) {
            setInProgress(false)
            setError(strings.errorCreatingProject)
        }
    }, [
        fileProps.ipfsMetadataHash,
        fileProps.ipfsMetadataUrl,
        fileProps.name,
        fileProps.offChainUrl,
        getAuthHeader,
        onClose,
        prevUploadState,
        uploadState,
        user.walletAccount,
        user.walletAddress
    ])

    return (
        <ModalDialog visible={visible} title={strings.createPlace} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <Label text={strings.howToSeePlaceOnMap} />
                    <ImageUploader onFileSelected={file => setFile(file)} />
                </div>
                <div className={styles.section}>
                    <InputField label={strings.memorablePlaceName} onChange={setName} />
                </div>
                <div className={styles.section}>
                    <DropDownSelector
                        label={strings.whatTypeOfPlace}
                        options={Place.list().map(place => ({ key: place.code, value: place.name }))}
                        onSelected={setPlaceType}
                    />
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

export default CreateProjectDialog

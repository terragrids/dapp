import Button from 'components/button'
import { ImageUploader } from 'components/image-uploader'
import { InputField } from 'components/input-field'
import { Label } from 'components/label'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context.js'
import { FileUploadState, useFileUploader } from 'hooks/use-file-uploader'
import usePrevious from 'hooks/use-previous.js'
import { User } from 'hooks/use-user.js'
import React, { useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config.js'
import { maskWalletAddress } from 'utils/string-utils.js'
import styles from './create-project-dialog.module.scss'

type CreateProjectDialogProps = {
    visible: boolean
    onClose: () => void
}

type Project = {
    name: string
    description: string
}

const defaultProject = {
    name: '',
    description: ''
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
    } = useFileUploader({ name: project.name, description: { text: project.description } })

    /**
     * Reset state when opening the dialog
     */
    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && prevVisible === false) {
            resetFileUploader()
            setProject(defaultProject)
            setError('')
        }
    }, [prevVisible, resetFileUploader, visible])

    function setName(name: string) {
        setProject(project => ({ ...project, name }))
    }

    function setDescription(description: string) {
        setProject(project => ({ ...project, description }))
    }

    function isValid() {
        return file && !!project.name && !!project.description
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
     * 2. Create a smart contract for the project on the blockchain
     */
    useEffect(() => {
        async function saveProject() {
            const response = await fetch(endpoints.projects, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    name: fileProps.name,
                    url: fileProps.ipfsMetadataUrl,
                    hash: fileProps.ipfsMetadataHash,
                    offChainImageUrl: fileProps.offChainUrl,
                    creator: user.walletAddress
                })
            })

            setInProgress(false)
            if (response.status !== 201) {
                setError(strings.errorCreatingProject)
            }
        }

        if (uploadState === FileUploadState.PINNED) {
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
        uploadState,
        user.walletAddress
    ])

    return (
        <ModalDialog visible={visible} title={strings.createProject} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.header}>{strings.createProjectWithWallet}</div>
                    {user && <div className={styles.address}>{maskWalletAddress(user.walletAddress)}</div>}
                </div>
                <div className={styles.section}>
                    <Label text={strings.projectLogo} />
                    <ImageUploader onFileSelected={file => setFile(file)} />
                </div>
                <div className={styles.section}>
                    <InputField label={strings.name} onChange={setName} />
                </div>
                <div className={styles.section}>
                    <InputField multiline label={strings.description} onChange={setDescription} />
                </div>
                <div className={styles.section}>
                    <Button
                        className={styles.button}
                        disabled={!isValid()}
                        label={strings.mint}
                        loading={isInProgress()}
                        checked={false}
                        onClick={submit}
                    />
                </div>
            </div>
        </ModalDialog>
    )
}

export default CreateProjectDialog

import { useCallback, useEffect, useState } from 'react'
import { endpoints, terragridsImageUrl } from 'utils/api-config.js'
import { getQueryParameter } from 'utils/string-utils.js'
import usePrevious from './use-previous.js'

type Props = {
    name: string
    description: string
    properties: object
}

export enum FileUploadState {
    IDLE,
    STARTED,
    ACCEPTED,
    UPLOADED,
    PINNED,
    ERROR
}

export function useFileUploader({ name, description, properties }: Props) {
    type FileProps = {
        uploadState: FileUploadState
        file?: File
        contentType?: string
        id?: string
        uploadUrl?: string
        offChainUrl?: string
        name?: string
        ipfsMetadataUrl?: string
        ipfsMetadataHash?: Uint8Array
    }

    const [fileProps, setFileProps] = useState<FileProps>({
        uploadState: FileUploadState.IDLE
    })

    const prevUploadState = usePrevious(fileProps.uploadState)

    /**
     * Step 1: request a pre-signed URL to upload a file
     */
    async function createSignedFileUploadUrl(contentType: string): Promise<void> {
        const response = await fetch(endpoints.fileUpload, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ contentType })
        })

        if (response.status === 201) {
            const { id, url } = await response.json()
            setFileProps(props => ({
                ...props,
                id: id,
                uploadUrl: url,
                uploadState: FileUploadState.ACCEPTED
            }))
        } else {
            setFileProps(props => ({
                ...props,
                uploadState: FileUploadState.ERROR
            }))
        }
    }

    /**
     * Step 2: Upload the file using the URL provided
     */
    const uploadFile = useCallback(async (): Promise<void> => {
        if (!fileProps.uploadUrl || !fileProps.contentType) return

        let cacheControl = getQueryParameter(fileProps.uploadUrl, 'Cache-Control')
        if (cacheControl) cacheControl = cacheControl.replace('%3D', '=')

        const response = await fetch(fileProps.uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': fileProps.contentType,
                ...(cacheControl && { 'Cache-Control': cacheControl })
            },
            referrerPolicy: 'no-referrer',
            body: fileProps.file
        })

        if (response.status === 200) {
            setFileProps(file => ({
                ...file,
                offChainUrl: terragridsImageUrl(fileProps.id),
                uploadState: FileUploadState.UPLOADED
            }))
        } else {
            setFileProps(file => ({
                ...file,
                uploadState: FileUploadState.ERROR
            }))
        }
    }, [fileProps.contentType, fileProps.file, fileProps.id, fileProps.uploadUrl])

    /**
     * Step 3: Pin the uploaded file to IPFS
     */
    const pinFileToIpfs = useCallback(async (): Promise<void> => {
        if (!fileProps.id) return

        const response = await fetch(endpoints.ipfsFiles, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                assetName: name,
                assetDescription: description,
                assetProperties: properties,
                fileName: fileProps.id
            })
        })

        if (response.status === 201) {
            const { assetName, url, integrity } = await response.json()
            setFileProps(file => ({
                ...file,
                name: assetName,
                ipfsMetadataUrl: url,
                ipfsMetadataHash: integrity,
                uploadState: FileUploadState.PINNED
            }))
        } else {
            setFileProps(file => ({
                ...file,
                uploadState: FileUploadState.ERROR
            }))
        }
    }, [fileProps.id, name, description, properties])

    /**
     * State machine
     * Upload states (with shouldConfirm): idle -> started -> accepted -> uploaded -> done
     * Upload states (without shouldConfirm): idle -> started -> accepted -> uploaded
     */
    useEffect(() => {
        if (prevUploadState === FileUploadState.STARTED && fileProps.uploadState === FileUploadState.ACCEPTED)
            uploadFile()
        if (prevUploadState === FileUploadState.ACCEPTED && fileProps.uploadState === FileUploadState.UPLOADED)
            pinFileToIpfs()
    }, [prevUploadState, fileProps.uploadState, uploadFile, pinFileToIpfs])

    function upload(file: File) {
        setFileProps(image => ({
            ...image,
            contentType: file.type,
            file: file,
            uploadState: FileUploadState.STARTED
        }))

        createSignedFileUploadUrl(file.type)
    }

    function reset() {
        setFileProps({
            uploadState: FileUploadState.IDLE
        })
    }

    return {
        upload,
        uploadState: fileProps.uploadState,
        fileProps: {
            offChainUrl: fileProps.offChainUrl,
            name: fileProps.name,
            ipfsMetadataUrl: fileProps.ipfsMetadataUrl,
            ipfsMetadataHash: fileProps.ipfsMetadataHash
        },
        reset
    }
}

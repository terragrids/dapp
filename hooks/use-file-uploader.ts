import { useCallback, useEffect, useState } from 'react'
import { endpoints } from 'utils/api-config.js'
import { getQueryParameter } from 'utils/string-utils.js'
import usePrevious from './use-previous.js'

export enum FileUploadState {
    IDLE, STARTED, ACCEPTED, UPLOADED, PINNED, ERROR
}

export function useFileUploader({ name, description }: Props) {
    type FileProps = {
        file?: File
        contentType?: string
        id?: string
        url?: string
        uploadState: FileUploadState
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
                url: url,
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
        if (!fileProps.url || !fileProps.contentType) return

        let cacheControl = getQueryParameter(fileProps.url, 'Cache-Control')
        if (cacheControl) cacheControl = cacheControl.replace('%3D', '=')

        const response = await fetch(fileProps.url, {
            method: 'PUT',
            headers: {
                'Content-Type': fileProps.contentType,
                ...cacheControl && { 'Cache-Control': cacheControl }
            },
            referrerPolicy: 'no-referrer',
            body: fileProps.file
        })

        if (response.status === 200) {
            setFileProps(file => ({
                ...file,
                uploadState: FileUploadState.UPLOADED
            }))
        } else {
            setFileProps(file => ({
                ...file,
                uploadState: FileUploadState.ERROR
            }))
        }
    }, [fileProps.contentType, fileProps.file, fileProps.url])

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
                fileName: fileProps.id
            })
        })

        if (response.status === 201) {
            setFileProps(file => ({
                ...file,
                uploadState: FileUploadState.PINNED
            }))
        } else {
            setFileProps(file => ({
                ...file,
                uploadState: FileUploadState.ERROR
            }))
        }
    }, [name, description, fileProps.id])

    /**
     * State machine
     * Upload states (with shouldConfirm): idle -> started -> accepted -> uploaded -> done
     * Upload states (without shouldConfirm): idle -> started -> accepted -> uploaded
     */
    useEffect(() => {
        if (prevUploadState === FileUploadState.STARTED && fileProps.uploadState === FileUploadState.ACCEPTED) uploadFile()
        if (prevUploadState === FileUploadState.ACCEPTED && fileProps.uploadState === FileUploadState.UPLOADED) pinFileToIpfs()
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

    return { upload, uploadState: fileProps.uploadState }
}

type Props = {
    name: string
    description: string
};
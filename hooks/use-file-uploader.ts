import { useState } from 'react'
import { endpoints } from 'utils/api-config.js'

export function useFileUploader() {
    type ImageProps = {
        file?: File
        contentType?: string
        id?: string
        url?: string
        uploadState: string
    }

    const [image, setImage] = useState<ImageProps>({
        uploadState: 'idle'
    })

    /**
     * Step 1: request a URL to upload an image
     */
    async function requestFileUpload(contentType: string): Promise<void> {
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
            setImage(image => ({
                ...image,
                id: id,
                url: url,
                uploadState: 'accepted'
            }))
        } else {
            setImage(image => ({
                ...image,
                uploadState: 'error'
            }))
        }
    }


    function upload(file: File) {
        setImage(image => ({
            ...image,
            contentType: file.type,
            file: file,
            uploadState: 'started'
        }))

        requestFileUpload(file.type)
    }

    return { upload, uploadState: image.uploadState }
}
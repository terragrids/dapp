import IpfsPinningError from 'errors/ipfs-pinning.error.js'
import { useCallback } from 'react'
import { endpoints, terragridsImageUrl } from 'utils/api-config.js'
import { useFetchOrLogin } from './use-fetch-or-login'

type Params = {
    id: string
    name: string
    description: string
    properties: object
}

type Result = {
    name: string
    ipfsMetadataUrl: string
    offChainImageUrl: string
    integrity: string
}

export function useFilePinner() {
    const { fetchOrLogin } = useFetchOrLogin()
    /**
     * Pin an existing S3 file to IPFS
     */
    const pinFileToIpfs = useCallback(
        async ({ id, name, description, properties }: Params): Promise<Result> => {
            if (!id || !name) throw new IpfsPinningError()

            const response = await fetchOrLogin(endpoints.ipfsMetadata, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    name,
                    description,
                    properties,
                    fileId: id
                })
            })

            if (response.ok) {
                const { name, url, integrity } = await response.json()
                return {
                    name,
                    ipfsMetadataUrl: url,
                    offChainImageUrl: terragridsImageUrl(id),
                    integrity
                }
            } else {
                throw new IpfsPinningError()
            }
        },
        [fetchOrLogin]
    )

    return { pinFileToIpfs }
}

import { ipfsUrl } from './api-config.js'

export function maskWalletAddress(address) {
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
}

export function truncate(str, cnt = 10) {
    return str.length > cnt ? str.substring(0, cnt) + '...' : str
}

export function getQueryParameter(searchString, parameter) {
    return searchString ? (searchString.match(`${parameter}=([^&]+)`) || [])[1] : undefined
}

export function getIpfsHash(url) {
    if (url && url.startsWith('ipfs://')) {
        return url.slice(7)
    }
    return null
}

export function ipfsUrlToGatewayUrl(url) {
    const hash = getIpfsHash(url)
    return ipfsUrl(hash)
}

export const NFT_SUFFIX = '@arc3'

export const formatNftName = str => str.replace(NFT_SUFFIX, '')

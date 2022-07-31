export function maskWalletAddress(address) {
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
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

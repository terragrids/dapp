export const TRDL_SUFFIX = '@arc3'

export const removeSuffix = (str: string, suffix: string) => {
    return str.replace(suffix, '')
}

export const shortenAddress = (address: string) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`

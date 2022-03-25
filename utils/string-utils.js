export function maskWalletAddress(address) {
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
}
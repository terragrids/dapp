export function maskWalletAddress(address) {
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
}

export function formatAlgoContractInfo(applicationId) {
    let hex = parseInt(applicationId || 0).toString(16)
    while (hex.length < 8) hex = '0' + hex
    return { type: 'BigNumber', hex: `0x${hex}` }
}
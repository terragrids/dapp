export default class IpfsPinningError extends Error {
    message

    constructor() {
        super()
        this.message = 'Unable to pin file to IPFS'
    }
}

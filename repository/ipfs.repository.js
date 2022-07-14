import pinataSDK from '@pinata/sdk'

export default class IpfsRepository {
    pinata

    constructor() {
        this.pinata = pinataSDK(process.env.PINATA_IPFS_API_KEY, process.env.PINATA_IPFS_API_SECRET)
    }

    async testConnection() {
        try {
            return await this.pinata.testAuthentication()
        } catch (e) {
            return { error: e }
        }
    }
}
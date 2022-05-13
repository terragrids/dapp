export default class AssetContractNotFoundError extends Error {
    httpCode = 404;

    constructor() {
        super()
    }

    toJson() {
        return {
            error: 'AssetContractNotFoundError',
            message: 'Asset contract specified not found'
        }
    }
}
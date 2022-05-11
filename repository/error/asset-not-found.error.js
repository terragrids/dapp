export default class AssetNotFoundError extends Error {
    httpCode = 404;

    constructor() {
        super()
    }

    toJson() {
        return {
            error: 'AssetNotFoundError',
            message: 'Asset specified not found'
        }
    }
}
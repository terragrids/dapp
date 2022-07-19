export default class ApplicationNotFoundError extends Error {
    httpCode = 404

    constructor() {
        super()
    }

    toJson() {
        return {
            error: 'ApplicationNotFoundError',
            message: 'Application specified not found'
        }
    }
}
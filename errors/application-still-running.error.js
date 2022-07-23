export default class ApplicationStillRunningError extends Error {
    httpCode = 400

    constructor() {
        super()
    }

    toJson() {
        return {
            error: 'ApplicationStillRunningError',
            message: 'Application specified is still running'
        }
    }
}
export default class RepositoryError extends Error {
    error;
    httpCode = 500;
    message;

    constructor(error, message) {
        super()
        this.error = error
        this.message = message
    }

    toJson() {
        return {
            error: 'RepositoryError',
            message: this.message,
            ...process.env.APP_ENV !== 'prod' && { info: this.error.message }
        }
    }
}

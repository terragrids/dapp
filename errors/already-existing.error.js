export default class AlreadyExistingError extends Error {
    httpCode = 400;
    message;

    constructor(message) {
        super()
        this.message = message
    }

    toJson() {
        return {
            error: 'AlreadyExistingError',
            message: this.message
        }
    }
}
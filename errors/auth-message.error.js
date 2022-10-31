export default class AuthMessageError extends Error {
    message

    constructor() {
        super()
        this.message = 'Unable to get auth message'
    }
}

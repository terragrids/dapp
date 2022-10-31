export default class SignAuthError extends Error {
    message

    constructor() {
        super()
        this.message = 'Unable to sign auth message'
    }
}

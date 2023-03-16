export default class UnauthorizedError extends Error {
    message

    constructor() {
        super()
        this.message = 'Unauthorized'
    }
}

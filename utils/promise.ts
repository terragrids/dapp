export function createPromise() {
    let succeed, fail
    const promise = new Promise(function (resolve, reject) {
        succeed = resolve
        fail = reject
    })
    return { promise, succeed, fail }
}

/**
 * Reads the specified file
 */
export default class FileLoader {
    file: File

    constructor(file: File) {
        this.file = file
    }

    isSupported = () => !!window.FileReader

    async load() {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()

            fileReader.onloadend = event => {
                resolve(event.target!.result)
            }

            fileReader.onerror = () => {
                fileReader.abort()
                reject()
            }

            fileReader.readAsDataURL(this.file)
        })
    }
}
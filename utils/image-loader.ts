/**
 * Loads the specified image
 */
export default class ImageLoader {
    src: string

    constructor(src: string) {
        this.src = src
    }

    async load(src: string) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve({
                width: img.width,
                height: img.height
            })
            img.onerror = reject
            img.src = src || this.src
        })
    }
}
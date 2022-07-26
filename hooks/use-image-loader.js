import { useEffect, useState } from 'react'
import ImageLoader from 'utils/image-loader.js'

export function useImageLoader(url) {
    const [state, setState] = useState({
        loading: false,
        loaded: false,
        error: false,
        imageSize: null
    })

    useEffect(() => {
        let isSubscribed = true

        async function loadImage() {
            if (!url) {
                isSubscribed && setState(prevState => ({
                    ...prevState,
                    error: true
                }))
            } else try {
                isSubscribed && setState(prevState => ({
                    ...prevState,
                    loading: true,
                    error: false,
                    imageSize: null
                }))

                const imageLoader = new ImageLoader()
                const imageSize = await imageLoader.load(url)

                isSubscribed && setState(prevState => ({
                    ...prevState,
                    loading: false,
                    loaded: true,
                    imageSize: imageSize
                }))
            } catch (e) {
                isSubscribed && setState(prevState => ({
                    ...prevState,
                    error: true
                }))
            }
        }

        loadImage()

        return function cleanup() {
            isSubscribed = false
        }
    }, [url])

    return { loading, loaded, error, imageSize } = state
}
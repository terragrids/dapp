import { useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import FileLoader from 'utils/file-loader'
import ImageLoader, { ImageSize } from 'utils/image-loader'
import { ImagePicker } from './image-picker'
import styles from './image-uploader.module.scss'

export const ImageUploader = () => {
    interface State {
        file?: File
        imageUrl?: string
        loaded: boolean
        width: number
        height: number
        tooSmall: boolean
        tooLarge: boolean
        fileTooBig: boolean
        errorMessage: string
    }

    const [state, setState] = useState<State>({
        loaded: false,
        width: 0,
        height: 0,
        tooSmall: false,
        tooLarge: false,
        fileTooBig: false,
        errorMessage: ''
    })

    const imageMinResolution = 300
    const imageMaxResolution = 5000
    const maxFileSize = 5 * (2 ** 20) // 5 MB

    function onFilesPicked(files: File[]) {
        const fileList = files.filter(file => !!file.type.match(/image.*/))
        if (files.length === 0) return

        setState(state => ({
            ...state,
            file: fileList[0],
            loaded: false,
            width: 0,
            height: 0,
            tooSmall: false,
            tooLarge: false
        }))
    }

    useEffect(() => {
        let isSubscribed = true

        async function loadImage() {
            if (!state.file) return
            try {
                const fileLoader = new FileLoader(state.file)
                const source = await fileLoader.load() as string

                const imageLoader = new ImageLoader(source)
                const image = await imageLoader.load(source) as ImageSize

                const imageTooSmall = image.width < imageMinResolution || image.height < imageMinResolution
                const imageTooLarge = imageMaxResolution && (image.width > imageMaxResolution || image.height > imageMaxResolution)
                const fileTooBig = state.file.size > maxFileSize

                isSubscribed && setState(state => ({
                    ...state,
                    imageUrl: source,
                    loaded: true,
                    width: image.width,
                    height: image.height,
                    tooSmall: imageTooSmall,
                    tooLarge: imageTooLarge,
                    fileTooBig: fileTooBig,
                    errorMessage: ''
                }))
            } catch (e) {
                isSubscribed && setState(state => ({
                    ...state,
                    errorMessage: strings.errorFileReader
                }))
            }
        }

        state.file && loadImage()

        return function cleanup() {
            isSubscribed = false
        }
    }, [maxFileSize, state.file])

    return (
        <div className={styles.container}>
            <div className={styles.scrollContent}>
                <ImagePicker
                    url={state.imageUrl}
                    onFilesPicked={onFilesPicked} />
            </div>
        </div>
    )
}

import { ImagePicker } from './image-picker'
import styles from './image-uploader.module.scss'

export const ImageUploader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.scrollContent}>
                <ImagePicker onFilesPicked={(/* files */) => {
                    /* todo */
                }} />
            </div>
        </div>
    )
}

/* eslint-disable @next/next/no-img-element */
import useFilePicker from 'hooks/use-file-picker.js'
import { strings } from 'strings/en.js'
import styles from './image-picker.module.scss'

export const ImagePicker = ({ url = '', disabled = false, multiple = false, clearPickerAtLaunch = true, onFilesPicked }: Props) => {
    const { state, fileInputRef, openFileDialog, onDragOver, onDragLeave, onDrop, onFilesAdded } = useFilePicker({ disabled, multiple, clearPickerAtLaunch, onFilesPicked })

    return (
        <div className={`${styles.container} ${state.active ? 'active' : 'idle'}`}
            onClick={openFileDialog}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            style={{ cursor: disabled ? 'default' : 'pointer' }}>
            {url &&
                <label htmlFor={'file-input'}>
                    {/* TODO: replace with Image */}
                    <picture>
                        <source srcSet={url} type={'image/*'} />
                        <img src={url} alt={'image'} />
                    </picture>
                </label>
            }
            {!url &&
                <div className={styles.empty}>
                    <label
                        htmlFor={'file-input'}
                        className={styles.emptyBorder}
                        style={{ cursor: disabled ? 'default' : 'pointer' }}
                        onClick={e => e.preventDefault()}>
                        <i className={'icon-cloud-upload'} />
                        <span className={styles.desktop}>{strings.dropImageHere}</span>
                        <span className={styles.mobile}>{strings.tapToPick}</span>
                        <div className={styles.subLabel}>{strings.orPickFromDialog}</div>
                    </label>
                </div>
            }
            {!disabled &&
                <div>
                    {url &&
                        <div className={`${styles.dropZone} ${styles.overlay}`}>
                            <i className={'icon-cloud-upload'} />
                        </div>
                    }
                    {url &&
                        <div className={`${styles.activeZone} ${styles.overlay}`}>
                            {strings.change}
                        </div>
                    }
                    <input
                        id={'file-input'}
                        className={styles.fileInput}
                        data-testid={'file-input'}
                        ref={fileInputRef}
                        type={'file'}
                        multiple={multiple}
                        accept={'image/*'}
                        onChange={onFilesAdded} />
                </div>
            }
        </div >
    )
}

type Props = {
    url?: string
    disabled?: boolean
    multiple?: boolean
    clearPickerAtLaunch?: boolean
    onFilesPicked: (array: File[]) => void
};

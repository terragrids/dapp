import styles from './button.module.scss'
import LoadingSpinner from './loading-spinner'

export enum ButtonType {
    FULL,
    OUTLINE,
    OUTLINE_ALERT
}

export enum ButtonSize {
    BIG,
    SMALL
}

type Props = {
    label: string
    type?: ButtonType
    size?: ButtonSize
    loading?: boolean
    checked?: boolean
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export default function Button({
    label,
    loading = false,
    checked = false,
    disabled = false,
    className = '',
    onClick,
    type = ButtonType.FULL,
    size = ButtonSize.BIG
}: Props) {
    const typeClass = () => {
        switch (type) {
            case ButtonType.OUTLINE:
                return styles.outline
            case ButtonType.OUTLINE_ALERT:
                return styles.outlineAlert
            default:
                return styles.default
        }
    }

    const sizeClass = () => {
        switch (size) {
            case ButtonSize.SMALL:
                return styles.small
            case ButtonSize.BIG:
            default:
                return styles.big
        }
    }

    return (
        <button
            className={`${styles.this} ${className} ${disabled ? styles.disabled : ''} ${typeClass()} ${sizeClass()}`}
            onClick={onClick}
            disabled={disabled || loading || checked}>
            {loading && <LoadingSpinner small />}
            {checked && <i className={'icon-check'} />}
            {!loading && !checked && label}
        </button>
    )
}

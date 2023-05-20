import styles from './iconbutton.module.scss'

export enum IconButtonType {
    FULL,
    OUTLINE
}

export enum Icon {
    CHECK = 'icon-check',
    EDIT = 'icon-pencil',
    ADD = 'icon-plus',
    DOCUMENT = 'icon-document',
    CHART = 'icon-chart-growth',
    ARCHIVE = 'icon-archive'
}

type Props = {
    icon: Icon
    tooltip: string
    type?: IconButtonType
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export default function IconButton({
    icon,
    tooltip,
    disabled = false,
    className = '',
    onClick,
    type = IconButtonType.FULL
}: Props) {
    const typeClass = () => {
        switch (type) {
            case IconButtonType.OUTLINE:
                return styles.outline
            default:
                return styles.default
        }
    }
    return (
        <button
            className={`${styles.this} ${className} ${disabled ? styles.disabled : ''} ${typeClass()}`}
            onClick={onClick}
            disabled={disabled}>
            <i className={icon} />
            <div className={styles.tooltip}>{tooltip}</div>
        </button>
    )
}

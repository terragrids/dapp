import styles from './iconbutton.module.scss'

export enum IconButtonType {
    FULL,
    OUTLINE
}

export enum Icon {
    CHECK = 'icon-check',
    EDIT = 'icon-pencil',
    EDIT_CLIPBOARD = 'icon-clipboard-pencil',
    ADD = 'icon-plus',
    DOCUMENT = 'icon-document',
    CHART = 'icon-chart-growth',
    LIST = 'icon-list',
    ARCHIVE = 'icon-archive',
    DELETE = 'icon-bin',
    PLUG = 'icon-cord'
}

type Props = {
    icon: Icon
    tooltip: string
    selected?: boolean
    type?: IconButtonType
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export default function IconButton({
    icon,
    tooltip,
    selected = false,
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
            className={`${styles.this} ${className} ${disabled ? styles.disabled : ''} ${
                selected ? styles.selected : ''
            } ${typeClass()}`}
            onClick={onClick}
            disabled={disabled}>
            <i className={icon} />
            <div className={styles.tooltip}>{tooltip}</div>
        </button>
    )
}

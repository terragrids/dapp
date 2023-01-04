import styles from './menu-drop-down-item.module.scss'

type Props = {
    id: string
    disabled?: boolean
    icon?: string
    text: string
    onClick?: (id: string) => void
}

export default function MenuDropDownItem({
    id,
    disabled,
    icon,
    text,
    onClick = () => {
        /* */
    }
}: Props) {
    function onItemClick() {
        if (!disabled) onClick(id)
    }

    return (
        <div
            className={`${styles.container} ${disabled ? styles.disabled : null}`}
            role={'menuitem'}
            onClick={onItemClick}>
            {icon && <i className={`${styles.icon} ${icon}`} />}
            <div className={styles.text}>{text}</div>
        </div>
    )
}

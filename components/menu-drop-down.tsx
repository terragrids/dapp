import { useDocumentEventListener } from 'hooks/use-document-event-listener.jsx'
import { ReactNode, useRef, useState } from 'react'
import styles from './menu-drop-down.module.scss'

type Props = {
    expanded?: boolean
    tooltip?: string
    icon?: string
    visible?: boolean
    selected?: boolean
    className?: string
    align?: Align
    children: ReactNode
}

export enum Align {
    LEFT,
    CENTER,
    RIGHT
}

export default function MenuDropDown({
    tooltip,
    icon = 'icon-ellipsis',
    visible = true,
    selected = false,
    children,
    className = '',
    align
}: Props) {
    const [expanded, setExpanded] = useState<boolean>(false)

    const node = useRef<HTMLDivElement>(null)
    useDocumentEventListener('mousedown', handleDocumentMouseDown)

    function handleDocumentMouseDown(e: MouseEvent) {
        if (node.current && !node.current.contains(e.target as Node)) {
            setExpanded(false)
        }
    }

    function onIconClick(e: React.UIEvent<HTMLElement>) {
        setExpanded(!expanded)
        e.stopPropagation()
    }

    function onListClick(e: React.UIEvent<HTMLElement>) {
        setExpanded(false)
        e.stopPropagation()
    }

    function getVisibilityClass() {
        return visible === false ? styles.hidden : styles.visible
    }

    function getRotationClass() {
        return icon === 'icon-ellipsis' ? ` ${styles.rotated}` : ''
    }

    const alignClass =
        align === Align.RIGHT ? styles.rightAligned : align === Align.CENTER ? styles.centerAligned : styles.leftAligned

    return (
        <div ref={node} className={`${styles.container} ${getVisibilityClass()} ${className}`}>
            <i
                aria-label={tooltip}
                className={icon + (selected ? ` ${styles.selected}` : '') + getRotationClass()}
                onClick={onIconClick}
            />

            {tooltip && !expanded && <div className={`${styles.tooltip} ${alignClass}`}>{tooltip}</div>}

            {children && expanded && (
                <div className={`${styles.menuItems} ${alignClass}`} onClick={onListClick}>
                    {children}
                </div>
            )}
        </div>
    )
}

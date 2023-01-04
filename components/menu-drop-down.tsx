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
    expanded = false,
    tooltip,
    icon = 'icon-ellipsis',
    visible = true,
    selected = false,
    children,
    className = '',
    align
}: Props) {
    const [state, setState] = useState({
        expanded: expanded,
        tooltipStyle: null,
        menuItemsStyle: null
    })

    const node = useRef<HTMLDivElement>(null)
    const tooltipNode = useRef<HTMLDivElement>(null)
    const menuItemsNode = useRef<HTMLDivElement>(null)
    useDocumentEventListener('mousedown', handleDocumentMouseDown)

    function handleDocumentMouseDown(e: React.UIEvent<HTMLElement>) {
        if (node.current && !node.current.contains(e.currentTarget)) {
            setState(state => ({
                ...state,
                expanded: false
            }))
        }
    }

    function onIconClick(e: React.UIEvent<HTMLElement>) {
        children &&
            setState(state => ({
                ...state,
                expanded: !state.expanded
            }))
        e.stopPropagation()
    }

    function onListClick() {
        setState(state => ({
            ...state,
            expanded: false
        }))
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

            {tooltip && !state.expanded && (
                <div ref={tooltipNode} className={`${styles.tooltip} ${alignClass}`}>
                    {tooltip}
                </div>
            )}

            {children && state.expanded && (
                <div ref={menuItemsNode} className={`${styles.menuItems} ${alignClass}`} onClick={onListClick}>
                    {children}
                </div>
            )}
        </div>
    )
}

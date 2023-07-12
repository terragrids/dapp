import { MouseEvent } from 'react'
import styles from './consumption-list-item.module.scss'

type ConsumptionListItemProps = {
    start: number
    end: number
    consumption: number
    unit: string
    selected: boolean
    onClick: (start: number) => void
    onShiftClick: (start: number) => void
}

const ConsumptionListItem = ({
    start,
    end,
    consumption,
    unit = '',
    selected,
    onClick,
    onShiftClick
}: ConsumptionListItemProps) => {
    const dateFormat = {
        timeStyle: 'short',
        dateStyle: 'short',
        timeZone: 'UTC'
    } as Intl.DateTimeFormatOptions

    function select(event: MouseEvent) {
        if (event.shiftKey) onShiftClick(start)
        else onClick(start)
    }

    return (
        <li className={`${styles.container} ${selected ? styles.selected : ''}`} onClick={select}>
            <div className={styles.interval}>
                <div>{new Date(start).toLocaleString([], dateFormat)}</div>
                <div className={styles.rightArrow}>{'\u2192'}</div>
                <div className={styles.downArrow}>{'\u2193'}</div>
                <div>{new Date(end).toLocaleString([], dateFormat)}</div>
            </div>
            <div className={styles.value}>{`${consumption} ${unit}`}</div>
        </li>
    )
}

export default ConsumptionListItem

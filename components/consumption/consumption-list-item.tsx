import { MouseEvent } from 'react'
import styles from './consumption-list-item.module.scss'
import Interval from 'components/interval/interval'

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
    function select(event: MouseEvent) {
        if (event.shiftKey) onShiftClick(start)
        else onClick(start)
    }

    return (
        <li className={`${styles.container} ${selected ? styles.selected : ''}`} onClick={select}>
            <Interval start={start} end={end} />
            <div className={styles.value}>{`${consumption} ${unit}`}</div>
        </li>
    )
}

export default ConsumptionListItem

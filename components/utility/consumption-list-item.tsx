import styles from './consumption-list-item.module.scss'

type ConsumptionListItemProps = {
    start: number
    end: number
    consumption: number
    unit: string
}

const ConsumptionListItem = ({ start, end, consumption, unit = '' }: ConsumptionListItemProps) => {
    const dateFormat = {
        timeStyle: 'short',
        dateStyle: 'short',
        timeZone: 'UTC'
    } as Intl.DateTimeFormatOptions

    return (
        <li className={styles.container}>
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

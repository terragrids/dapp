import styles from './interval.module.scss'

type IntervalProps = {
    start: number
    end: number
}

const Interval = ({ start, end }: IntervalProps) => {
    const dateFormat = {
        timeStyle: 'short',
        dateStyle: 'short',
        timeZone: 'UTC'
    } as Intl.DateTimeFormatOptions

    return (
        <div className={styles.interval}>
            <div>{new Date(start).toLocaleString([], dateFormat)}</div>
            <div className={styles.rightArrow}>{'\u2192'}</div>
            <div className={styles.downArrow}>{'\u2193'}</div>
            <div>{new Date(end).toLocaleString([], dateFormat)}</div>
        </div>
    )
}

export default Interval

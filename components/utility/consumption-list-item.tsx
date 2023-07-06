import styles from './consumption-list-item.module.scss'

type ConsumptionListItemProps = {
    start: number
    end: number
    consumption: number
}

const ConsumptionListItem = ({ start, end, consumption }: ConsumptionListItemProps) => {
    return (
        <li className={styles.container}>{`${new Date(start).toLocaleString()} -> ${new Date(
            end
        ).toLocaleString()} ${consumption}`}</li>
    )
}

export default ConsumptionListItem

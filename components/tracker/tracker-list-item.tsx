import styles from './tracker-list-item.module.scss'

type TrackerListItemProps = {
    id: string
    name: string
    imageUrl: string
    onClick: (id: string) => void
}

const TrackerListItem = ({ id, name, imageUrl, onClick }: TrackerListItemProps) => {
    return (
        <li className={styles.container} onClick={() => onClick(id)}>
            <div className={styles.leftContainer}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={name} className={styles.image} />
                </div>
                <div className={styles.name}>
                    <div>{name}</div>
                </div>
            </div>
            <div className={styles.rightContainer}></div>
        </li>
    )
}

export default TrackerListItem

import styles from './projects-list-item.module.scss'

type ProjectListItemProps = {
    id: string
    name: string
    imageUrl: string
    onClick: (id: string) => void
}

const ProjectListItem = ({ id, name, imageUrl, onClick }: ProjectListItemProps) => {
    return (
        <li className={styles.container} onClick={() => onClick(id)}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={name} className={styles.image} />
            </div>
            <div className={styles.nameContainer}>
                <div>{name}</div>
            </div>
        </li>
    )
}

export default ProjectListItem

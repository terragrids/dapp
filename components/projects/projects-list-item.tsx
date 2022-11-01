import styles from './projects-list-item.module.scss'

type ProjectListItemProps = {
    id: string
    name: string
    imageUrl: string
}

const ProjectListItem = ({ name, imageUrl }: ProjectListItemProps) => {
    return (
        <li className={styles.container}>
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

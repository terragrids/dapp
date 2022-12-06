import { maskWalletAddress } from 'utils/string-utils.js'
import styles from './projects-list-item.module.scss'

type ProjectListItemProps = {
    id: string
    name: string
    ownerWallet: string | null
    imageUrl: string
    onClick: (id: string) => void
}

const ProjectListItem = ({ id, name, imageUrl, ownerWallet = null, onClick }: ProjectListItemProps) => {
    return (
        <li className={styles.container} onClick={() => onClick(id)}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={name} className={styles.image} />
            </div>
            <div className={styles.nameContainer}>
                <div>{name}</div>
            </div>
            {ownerWallet && <div className={styles.ownerContainer}>{maskWalletAddress(ownerWallet)}</div>}
        </li>
    )
}

export default ProjectListItem

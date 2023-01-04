import MenuDropDown, { Align } from 'components/menu-drop-down'
import MenuDropDownItem from 'components/menu-drop-down-item'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user.js'
import { useContext } from 'react'
import { strings } from 'strings/en.js'
import { maskWalletAddress } from 'utils/string-utils.js'
import styles from './projects-list-item.module.scss'

type ProjectListItemProps = {
    id: string
    name: string
    ownerWallet: string | null
    imageUrl: string
    onClick: (id: string) => void
    onArchive: (id: string) => void
    onDelete: (id: string) => void
}

const ProjectListItem = ({
    id,
    name,
    imageUrl,
    ownerWallet = null,
    onClick,
    onArchive,
    onDelete
}: ProjectListItemProps) => {
    const user = useContext<User>(UserContext)

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
            <div className={styles.rightContainer}>
                {ownerWallet && <div className={styles.owner}>{maskWalletAddress(ownerWallet)}</div>}
                {user && user.isAdmin && (
                    <div className={styles.menuButton}>
                        <MenuDropDown align={Align.RIGHT}>
                            <MenuDropDownItem
                                id={id}
                                text={strings.archive}
                                icon={'icon-archive'}
                                onClick={onArchive}
                            />
                            <MenuDropDownItem id={id} text={strings.delete} icon={'icon-bin'} onClick={onDelete} />
                        </MenuDropDown>
                    </div>
                )}
            </div>
        </li>
    )
}

export default ProjectListItem

import MenuDropDown, { Align } from 'components/menu-drop-down'
import MenuDropDownItem from 'components/menu-drop-down-item'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user.js'
import { useContext } from 'react'
import { strings } from 'strings/en.js'
import { maskAddress } from 'utils/string-utils.js'
import styles from './place-list-item.module.scss'

type PlaceListItemProps = {
    id: string
    name: string
    ownerWallet: string | null
    imageUrl: string
    onClick: (id: string) => void
    onArchive: (id: string) => void
    onDelete: (id: string) => void
}

const PlaceListItem = ({
    id,
    name,
    imageUrl,
    ownerWallet = null,
    onClick,
    onArchive,
    onDelete
}: PlaceListItemProps) => {
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
                {ownerWallet && <div className={styles.owner}>{maskAddress(ownerWallet)}</div>}
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

export default PlaceListItem

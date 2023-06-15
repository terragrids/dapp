import { Holder } from 'types/nft'
import { maskAddress } from 'utils/string-utils.js'
import styles from './nft-list-item.module.scss'

type NftListItemProps = {
    id: string
    name: string
    status: string
    holder?: Holder | null
    imageUrl: string
    onClick: (id: string) => void
}

const NftListItem = ({ id, name, imageUrl, holder = null, onClick }: NftListItemProps) => {
    return (
        <li className={styles.container} onClick={() => onClick(id)}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={name} className={styles.image} />
            </div>
            <div className={styles.name}>{name}</div>
            {holder && <div className={styles.holder}>{maskAddress(holder.address)}</div>}
        </li>
    )
}

export default NftListItem

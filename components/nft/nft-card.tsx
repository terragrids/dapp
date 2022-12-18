import styles from './nft-card.module.scss'

type NftCardProps = {
    id: string
}

const NftCard = ({ id }: NftCardProps) => {
    return <div className={styles.container}>{id}</div>
}

export default NftCard

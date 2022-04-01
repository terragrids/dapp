import { strings } from '../strings/en'
import styles from './content.module.scss'

export default function Content({ contractInfo, nftId }) {
    return (
        <div className={styles.container}>
            <div>{strings.helloExplorer}</div>
            {nftId && <div>{`You have just created and new NFT with ID ${nftId}`}</div>}
            {contractInfo && <div>{`You can trade it by joining this contract ${contractInfo}`}</div>}
        </div>
    )
}
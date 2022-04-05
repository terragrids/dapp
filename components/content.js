import { strings } from '../strings/en'
import styles from './content.module.scss'

export default function Content({ contractInfo, balance }) {
    return (
        <div className={styles.container}>
            <div>{strings.helloExplorer}</div>
            {balance && balance.symbol &&
                <div className={styles.balance}>
                    {`You have $${balance.symbol} ${balance.amount}`}
                </div>
            }
            {contractInfo &&
                <div className={styles.note}>
                    <span>{'You can buy Terragrids tokens by joining this contract:'}</span>
                    <pre className={styles.code}>{contractInfo}</pre>
                </div>
            }
        </div>
    )
}
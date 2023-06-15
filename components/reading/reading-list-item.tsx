import { formatTimestamp } from 'utils/string-utils.js'
import styles from './reading-list-item.module.scss'
import { useState } from 'react'
import { TransactionLink } from 'components/transaction-link'
import { strings } from 'strings/en.js'

type ReadingListItemProps = {
    id: string
    value: number
    unit: string
    date: string
    onClick: (id: string) => void
}

const ReadingListItem = ({ id, value, unit, date, onClick }: ReadingListItemProps) => {
    const [showDetails, setShowDetails] = useState<boolean>()

    function handleClick() {
        onClick(id)
        setShowDetails(!showDetails)
    }

    return (
        <li className={styles.container} onClick={handleClick}>
            <div className={styles.top}>
                <div className={styles.leftContainer}>
                    <div className={styles.value}>
                        <div>
                            {value} {unit}
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.date}>
                        <div>{formatTimestamp(parseInt(date))}</div>
                    </div>
                </div>
            </div>
            {showDetails && (
                <div className={styles.bottom}>
                    <div className={styles.label}>{strings.transactionId}</div>
                    <TransactionLink transactionId={id} />
                </div>
            )}
        </li>
    )
}

export default ReadingListItem

import styles from './reading-list-item.module.scss'
import { useState } from 'react'
import { TransactionLink } from 'components/transaction-link'
import { strings } from 'strings/en.js'
import { formatTimestamp } from 'utils/time-utils'
import { ReadingType } from 'types/reading'
import Interval from 'components/interval/interval'
import Button, { ButtonSize, ButtonType } from 'components/button'

type ReadingListItemProps = {
    id: string
    value: number
    unit: string
    date: string
    type: string
    cycle: string
    start: number | undefined
    end: number | undefined
    selected: boolean
    canDelete: boolean
    isDeleting: boolean
    onClick: (id: string) => void
    onDelete: (id: string) => void
}

const ReadingListItem = ({
    id,
    value,
    unit,
    date,
    type,
    cycle,
    start,
    end,
    selected,
    canDelete,
    isDeleting,
    onDelete,
    onClick
}: ReadingListItemProps) => {
    const [showDetails, setShowDetails] = useState<boolean>()

    function handleClick() {
        onClick(id)
        setShowDetails(!showDetails)
    }

    function handleDelete(e: React.UIEvent<HTMLElement>) {
        onDelete(id)
        e.stopPropagation()
    }

    return (
        <li className={`${styles.container} ${selected ? styles.selected : ''}`} onClick={handleClick}>
            <div className={styles.top}>
                <div className={styles.leftContainer}>
                    <div className={styles.value}>
                        <div>
                            {value} {unit}
                        </div>
                        <div className={styles.type}>
                            {type === ReadingType.CONSUMPTION
                                ? `${cycle || ''} ${strings.consumption}`
                                : strings.meterReading}
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    {type === ReadingType.CONSUMPTION && start && <Interval start={start} />}
                    {(type !== ReadingType.CONSUMPTION || !start || !end) && (
                        <div className={styles.date}>{formatTimestamp(parseInt(date))}</div>
                    )}
                </div>
            </div>
            {showDetails && (
                <>
                    <div className={styles.bottom}>
                        <div className={styles.label}>{strings.imported}</div>
                        <div>{formatTimestamp(parseInt(date))}</div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.label}>{strings.transactionId}</div>
                        <TransactionLink transactionId={id} />
                    </div>
                    <div className={styles.actions}>
                        {canDelete && (
                            <Button
                                type={ButtonType.OUTLINE}
                                size={ButtonSize.SMALL}
                                label={strings.delete}
                                loading={isDeleting}
                                onClick={handleDelete}
                            />
                        )}
                    </div>
                </>
            )}
        </li>
    )
}

export default ReadingListItem

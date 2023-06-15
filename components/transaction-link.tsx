import { getTransactionAlgoExplorerUrl, maskAddress } from 'utils/string-utils.js'

type Props = {
    transactionId: string
}

export const TransactionLink = ({ transactionId }: Props) => {
    return (
        <div>
            <a href={getTransactionAlgoExplorerUrl(transactionId)} target={'_blank'} rel={'noreferrer'}>
                {maskAddress(transactionId)}
            </a>
        </div>
    )
}

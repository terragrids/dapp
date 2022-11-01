import { getApplicationAlgoExplorerUrl } from 'utils/string-utils.js'

type Props = {
    contractId: string
}

export const ContractLink = ({ contractId }: Props) => {
    return (
        <div>
            <a href={getApplicationAlgoExplorerUrl(contractId)} target={'_blank'} rel={'noreferrer'}>
                {contractId}
            </a>
        </div>
    )
}

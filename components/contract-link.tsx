import { useSppViewer } from 'hooks/use-spp-viewer.js'
import { getApplicationAlgoExplorerUrl } from 'utils/string-utils.js'

export const ContractLink = ({ contractInfo }: Props) => {
    const { getContractId } = useSppViewer()
    const contractId = getContractId(contractInfo)

    return (
        <pre>
            <a href={getApplicationAlgoExplorerUrl(contractId)} target={'_blank'} rel={'noreferrer'}>
                {contractId}
            </a>
        </pre>
    )
}

type Props = {
    contractInfo: string
}

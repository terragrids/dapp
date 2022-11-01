import { useSppViewer } from 'hooks/use-spp-viewer.js'
import { ContractLink } from './contract-link'

type Props = {
    contractInfo: string
}

export const SppContractLink = ({ contractInfo }: Props) => {
    const { getContractId } = useSppViewer()
    const contractId = getContractId(contractInfo) as string

    return <ContractLink contractId={contractId} />
}

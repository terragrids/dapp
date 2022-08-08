//import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../../utils/api-config'
import { setMethodNotAllowedResponse } from '../../../../../utils/api-config'import { setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //await callTerragridsApi(res, 'GET', `accounts/${req.query.accountId}/nfts/${req.query.symbol}`)
            res.status(200).json({
                totalOutput: 75,
                assets: [
                    { id: 82484689, name: 'Terracell #1', symbol: 'TRCL', url: 'https://terragrids.org#1', output: 10 },
                    { id: 82485528, name: 'Terracell #2', symbol: 'TRCL', url: 'https://terragrids.org#2', output: 45 },
                    { id: 82485530, name: 'Terracell #3', symbol: 'TRCL', url: 'https://terragrids.org#3', output: 15 }
                ]
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

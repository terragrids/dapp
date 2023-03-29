import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callTerragridsApi(res, 'GET', `accounts/${req.query.userId}/nfts/${req.query.symbol}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

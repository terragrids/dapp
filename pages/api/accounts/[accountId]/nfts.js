import { setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //await callTerragridsApi(res, 'GET', `accounts/${req.query.accountId}/nfts`)
            res.status(200).json({trcl: 8, trld: 5, tras: 3})
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}
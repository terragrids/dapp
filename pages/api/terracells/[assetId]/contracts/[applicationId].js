import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await callTerragridsApi(res, 'POST', `terracells/${req.query.assetId}/contracts/${req.query.applicationId}`, req.body)
            break
        case 'DELETE':
            await callTerragridsApi(res, 'DELETE', `terracells/${req.query.assetId}/contracts/${req.query.applicationId}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['POST', 'DELETE'])
    }
}

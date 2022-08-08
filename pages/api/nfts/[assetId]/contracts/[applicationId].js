/* eslint-disable unicorn/filename-case */
import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await callTerragridsApi(res, 'POST', `nfts/${req.query.assetId}/contracts/${req.query.applicationId}`, req.body)
            break
        case 'DELETE':
            await callTerragridsApi(res, 'DELETE', `nfts/${req.query.assetId}/contracts/${req.query.applicationId}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['POST', 'DELETE'])
    }
}

import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await callTerragridsApi(res, 'POST', `terracells/${req.query['asset-id']}/contracts/${req.query['application-id']}`, req.body)
            break
        case 'DELETE':
            await callTerragridsApi(res, 'DELETE', `terracells/${req.query['asset-id']}/contracts/${req.query['application-id']}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['POST', 'DELETE'])
    }
}

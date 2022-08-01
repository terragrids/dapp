import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await callTerragridsApi(res, 'POST', `terracells/${req.query.assetid}/contracts/${req.query.applicationid}`, req.body)
            break
        case 'DELETE':
            await callTerragridsApi(res, 'DELETE', `terracells/${req.query.assetid}/contracts/${req.query.applicationid}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['POST', 'DELETE'])
    }
}

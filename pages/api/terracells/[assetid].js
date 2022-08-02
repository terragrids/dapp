import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callTerragridsApi(res, 'GET', `terracells/${req.query.assetid}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}
import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callTerragridsApi(res, 'GET', `accounts/${req.query['account-id']}/terracells`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

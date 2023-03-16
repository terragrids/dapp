import { callTerragridsApi, setMethodNotAllowedResponse } from 'utils/api-config.js'
import { getAuthToken } from 'utils/auth-utils.js'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const authToken = await getAuthToken(req, res)
            if (authToken) {
                await callTerragridsApi(res, 'GET', 'user', null, {
                    authorization: `Bearer ${authToken}`
                })
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

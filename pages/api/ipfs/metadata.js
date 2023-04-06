import { getAuthToken } from 'utils/auth-utils.js'
import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const authToken = await getAuthToken(req, res)
            if (authToken) {
                await callTerragridsApi(res, 'POST', 'ipfs/metadata', req.body, {
                    authorization: `Bearer ${authToken}`
                })
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['POST'])
    }
}

import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { callTerragridsApi } from 'utils/api-config.js'

export default withApiAuthRequired(async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const { accessToken } = await getAccessToken(req, res)
            await callTerragridsApi(res, 'GET', 'user', null, { authorization: `Bearer ${accessToken}` })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
})

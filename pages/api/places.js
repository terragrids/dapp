import { getAuthToken } from 'utils/auth-utils.js'
import { callProjectsApi, setMethodNotAllowedResponse } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', 'places', null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey,
                status: req.query.status,
                sort: req.query.sort
            })
            break
        case 'POST':
            const authToken = await getAuthToken(req, res)
            if (authToken) {
                await callProjectsApi(res, 'POST', 'places', JSON.parse(req.body), {
                    authorization: `Bearer ${authToken}`
                })
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['GET', 'POST'])
    }
}

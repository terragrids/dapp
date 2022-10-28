import { callProjectsApi, setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `creators/${req.query.accountId}/projects`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

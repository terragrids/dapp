import { callProjectsApi, setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `creators/${req.query.accountId}/projects`, null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

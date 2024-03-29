import { callProjectsApi, setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `users/${req.query.userId}/places`, null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey,
                status: req.query.status,
                sort: req.query.sort
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

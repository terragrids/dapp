import { callProjectsApi, setMethodNotAllowedResponse } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', 'projects', null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey
            })
            break
        case 'POST':
            await callProjectsApi(res, 'POST', 'projects', req.body, { authorization: req.headers.authorization })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET', 'POST'])
    }
}

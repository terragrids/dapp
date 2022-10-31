import { callProjectsApi, setMethodNotAllowedResponse } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await callProjectsApi(res, 'POST', 'projects', req.body, { authorization: req.headers.authorization })
            break
        default:
            setMethodNotAllowedResponse(res, ['POST'])
    }
}
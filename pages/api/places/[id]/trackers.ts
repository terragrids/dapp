import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `places/${req.query.id}/trackers`, null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey,
                status: req.query.status,
                type: req.query.type,
                sort: req.query.sort
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

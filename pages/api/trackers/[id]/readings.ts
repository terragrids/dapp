import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `trackers/${req.query.id}/readings`, null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey,
                cycle: req.query.cycle,
                status: req.query.status,
                sort: req.query.sort
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

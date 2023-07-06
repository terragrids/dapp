import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config.js'
import { getAuthToken } from 'utils/auth-utils.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const authToken = await getAuthToken(req, res)
            if (authToken) {
                await callProjectsApi(
                    res,
                    'GET',
                    `trackers/${req.query.id}/utility/consumption`,
                    null,
                    {
                        authorization: `Bearer ${authToken}`
                    },
                    {
                        page: req.query.page,
                        periodFrom: req.query.periodFrom,
                        periodTo: req.query.periodTo,
                        groupBy: req.query.groupBy,
                        sort: req.query.sort
                    }
                )
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

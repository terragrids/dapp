/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `places/${req.query.id}`)
            break
        case 'PUT':
            await callProjectsApi(res, 'PUT', `places/${req.query.id}`, req.body, {
                authorization: req.headers.authorization
            })
            break
        case 'DELETE':
            await callProjectsApi(
                res,
                'DELETE',
                `places/${req.query.id}`,
                null,
                { authorization: req.headers.authorization },
                {
                    ...(req.query.permanent && { permanent: req.query.permanent })
                }
            )
            break
        default:
            setMethodNotAllowedResponse(res, ['GET', 'PUT', 'DELETE'])
    }
}

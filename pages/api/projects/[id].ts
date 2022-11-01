/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `projects/${req.query.id}`)
            break
        case 'PUT':
            await callProjectsApi(res, 'PUT', `projects/${req.query.id}`, req.body, {
                authorization: req.headers.authorization
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET', 'PUT'])
    }
}

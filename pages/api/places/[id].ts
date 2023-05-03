/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config'
import { getAuthToken } from 'utils/auth-utils.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callProjectsApi(res, 'GET', `places/${req.query.id}`)
            break
        case 'PUT':
            {
                const authToken = await getAuthToken(req, res)
                if (authToken) {
                    await callProjectsApi(res, 'PUT', `places/${req.query.id}`, JSON.parse(req.body), {
                        authorization: `Bearer ${authToken}`
                    })
                }
            }
            break
        case 'DELETE':
            {
                const authToken = await getAuthToken(req, res)
                if (authToken) {
                    await callProjectsApi(
                        res,
                        'DELETE',
                        `places/${req.query.id}`,
                        null,
                        {
                            authorization: `Bearer ${authToken}`
                        },
                        {
                            ...(req.query.permanent && { permanent: req.query.permanent })
                        }
                    )
                }
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['GET', 'PUT', 'DELETE'])
    }
}

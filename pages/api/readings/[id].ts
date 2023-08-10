/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config'
import { getAuthToken } from 'utils/auth-utils.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'DELETE':
            {
                const authToken = await getAuthToken(req, res)
                if (authToken) {
                    await callProjectsApi(res, 'DELETE', `readings/${req.query.id}`, null, {
                        authorization: `Bearer ${authToken}`
                    })
                }
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['DELETE'])
    }
}

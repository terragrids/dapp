/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callProjectsApi, setMethodNotAllowedResponse } from 'utils/api-config'
import { getAuthToken } from 'utils/auth-utils.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const authToken = await getAuthToken(req, res)
            if (authToken) {
                await callProjectsApi(res, 'POST', 'readings', JSON.parse(req.body), {
                    authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                })
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['PUT'])
    }
}

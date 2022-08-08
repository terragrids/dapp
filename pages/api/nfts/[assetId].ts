/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callTerragridsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            await callTerragridsApi(res, 'GET', `nfts/${req.query.assetId}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

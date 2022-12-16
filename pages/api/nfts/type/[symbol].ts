/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callTerragridsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callTerragridsApi(res, 'GET', `nfts/type/${req.query.symbol}`, null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

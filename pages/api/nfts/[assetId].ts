/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callNftsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await callNftsApi(res, 'GET', `nfts/${req.query.assetId}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

/* eslint-disable unicorn/filename-case */
import { NFT_MOCKS } from 'mocks/nfts/type/symbol'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callTerragridsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
        case 'GET':
            if (process.env.NEXT_PUBLIC_OFFLINE === 'true') {
                res.status(200).send(NFT_MOCKS.nfts)
            } else
                await callTerragridsApi(res, 'GET', `nfts/type/${req.query.symbol}`, null, null, {
                    pageSize: req.query.pageSize,
                    nextPageKey: req.query.nextPageKey
                })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

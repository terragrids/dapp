/* eslint-disable unicorn/filename-case */
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callTerragridsApi, setMethodNotAllowedResponse } from 'utils/api-config'
import { NFT_MOCKS } from '../../../../mocks/nfts/type/symbol'

type Data = {
    assets?:
    | typeof NFT_MOCKS['trld']['assets']
    | typeof NFT_MOCKS['trcl']['assets']
    'next-token'?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            // if (matchKey(req.query.symbol)) {
            //     const response = NFT_MOCKS[req.query.symbol]
            //     return res.status(200).json(response)
            // }
            // return res.status(404).end()
            await callTerragridsApi(res, 'GET', `nfts/type/${req.query.symbol}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

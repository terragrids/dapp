/* eslint-disable unicorn/filename-case */
import { NFT_MOCKS } from 'mocks/nfts/type/symbol'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { callTerragridsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            //   TODO: remove this if state once API for trcl is ready
            if (req.query.symbol === 'trcl') {
                res.status(200).json(NFT_MOCKS['trcl'])
                break
            }
            await callTerragridsApi(res, 'GET', `nfts/type/${req.query.symbol}`)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

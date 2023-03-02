import { NextApiRequest, NextApiResponse } from 'next/types'
import { callNftsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            await callNftsApi(res, 'PUT', `nfts/${req.query.assetId}/purchase`, req.body)
            break
        default:
            setMethodNotAllowedResponse(res, ['POST'])
    }
}

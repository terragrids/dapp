import { NextApiRequest, NextApiResponse } from 'next/types'
import { callNftsApi, setMethodNotAllowedResponse } from 'utils/api-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            await callNftsApi(res, 'POST', `nfts/${req.query.assetId}/purchase/auth`, req.body, {
                authorization: req.headers.authorization
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['POST'])
    }
}

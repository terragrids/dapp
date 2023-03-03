import { callNftsApi, setMethodNotAllowedResponse } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await callNftsApi(res, 'GET', 'nfts', null, null, {
                pageSize: req.query.pageSize,
                nextPageKey: req.query.nextPageKey,
                symbol: req.query.symbol,
                status: req.query.status,
                projectId: req.query.projectId,
                sort: req.query.sort
            })
            break
        case 'POST':
            await callNftsApi(res, 'POST', 'nfts', req.body, { authorization: req.headers.authorization })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET', 'POST'])
    }
}

import AssetNotFoundError from '../../../errors/asset-not-found.error'
import TokenRepository from '../../../repository/token.repository'
import { algonodeIndexerBaseUrl, handleHttpRequest, setMethodNotAllowedResponse } from '../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await handleHttpRequest(res, async () => {
                const [assetResponse, balanceResponse, contract] = await Promise.all([
                    fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}`),
                    fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}/balances`),
                    new TokenRepository().getTokenContract(req.query.assetId)
                ])

                const [{ asset }, { balances }] = await Promise.all([assetResponse.json(), balanceResponse.json()])

                if (!asset || asset.params['unit-name'] !== 'TRCL') {
                    throw new AssetNotFoundError()
                } else {
                    res.send({
                        asset: ({
                            id: asset.index,
                            name: asset.params.name,
                            symbol: asset.params['unit-name'],
                            url: asset.params.url,
                            holders: balances
                                .filter(balance => balance.amount > 0)
                                .map(balance => ({
                                    address: balance.address,
                                    amount: balance.amount
                                })),
                            ...contract && { contract }
                        })
                    })
                }
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

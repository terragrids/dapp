import AssetNotFoundError from '../../../errors/asset-not-found.error'
import { algonodeIndexerBaseUrl, handleHttpRequest, setMethodNotAllowedResponse } from '../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await handleHttpRequest(res, async () => {
                const [assetResponse, balanceResponse] = await Promise.all([
                    fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}`),
                    fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}/balances`)
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
                                }))
                        })
                    })
                }
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

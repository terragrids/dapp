import { randLabsIndexerBaseUrl, setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const response = await fetch(`${randLabsIndexerBaseUrl}/accounts/${req.query.accountId}/assets`)
            const json = await response.json()
            res.send({
                assets: json.assets
                    .filter(asset => !asset.deleted && asset.amount === 1 && asset.decimals === 0 && asset['unit-name'] === 'TRCL')
                    .map(asset => ({
                        id: asset['asset-id'],
                        name: asset.name,
                        symbol: asset['unit-name']
                    }))
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

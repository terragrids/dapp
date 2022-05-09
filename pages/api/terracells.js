import { algonodeIndexerBaseUrl, setMethodNotAllowedResponse } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const response = await fetch(`${algonodeIndexerBaseUrl}/assets?unit=TRCL`)
            const json = await response.json()
            res.send({
                assets: json.assets
                    .filter(asset => !asset.deleted && asset.params.total === 1 && asset.params.decimals === 0)
                    .map(asset => ({
                        id: asset.index,
                        name: asset.params.name,
                        symbol: asset.params['unit-name'],
                        url: asset.params.url
                    }))
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

import { algorandIndexerBaseUrl } from './config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const response = await fetch(`${algorandIndexerBaseUrl}/assets?unit=TRCL`)
            const json = await response.json()
            res.status(200).json({
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
            res.setHeader('Allow', ['GET'])
            res.status(405).end()
    }
}

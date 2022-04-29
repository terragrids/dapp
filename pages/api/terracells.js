import nc from 'next-connect'
import cors from 'cors'
import { algorandIndexerBaseUrl } from './config'

const handler = nc()
    .use(cors())
    .get(async (req, res) => {
        const response = await fetch(`${algorandIndexerBaseUrl}/assets?unit=TRCL`)
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
    })

export default handler
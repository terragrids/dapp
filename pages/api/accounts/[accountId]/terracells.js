import nc from 'next-connect'
import cors from 'cors'
import { randLabsIndexerBaseUrl } from '../../../../utils/api-config'

const handler = nc()
    .use(cors())
    .get(async (req, res) => {
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
    })

export default handler
import nc from 'next-connect'
import cors from 'cors'
import { randLabsIndexerBaseUrl } from '../config'

const handler = nc()
    .use(cors())
    .get(async (req, res) => {
        const [assetResponse, balanceRespnse] = await Promise.all([
            fetch(`${randLabsIndexerBaseUrl}/assets/${req.query.assetId}`),
            fetch(`${randLabsIndexerBaseUrl}/assets/${req.query.assetId}/balances`)
        ])

        const [{ asset }, { balances }] = await Promise.all([assetResponse.json(), balanceRespnse.json()])

        if (!asset || asset.params['unit-name'] !== 'TRCL') {
            res.status(404).json({ error: 'No TRCL found with this asset-id' })
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

export default handler
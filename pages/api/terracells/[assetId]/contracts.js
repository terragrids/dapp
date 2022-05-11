import AssetNotFoundError from '../../../../repository/error/asset-not-found.error'
import MissingParameterError from '../../../../repository/error/missing-parameter.error'
import TokenRepository from '../../../../repository/token.repository'
import { algonodeIndexerBaseUrl, setMethodNotAllowedResponse } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                if (!req.query.assetId) throw new MissingParameterError('assetId')
                if (!req.body) throw new MissingParameterError('Request body')
                if (!req.body.applicationId) throw new MissingParameterError('applicationId')
                if (!req.body.contractInfo) throw new MissingParameterError('contractInfo')
                if (!req.body.sellerAddress) throw new MissingParameterError('sellerAddress')
                if (!req.body.assetPrice) throw new MissingParameterError('assetPrice')
                if (!req.body.assetPriceUnit) throw new MissingParameterError('assetPriceUnit')

                const response = await fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}`)
                const { asset } = await response.json()

                if (!asset || asset.params['unit-name'] !== 'TRCL') {
                    throw new AssetNotFoundError()
                }

                await new TokenRepository().putTokenContract({
                    assetId: req.body.assetId,
                    applicationId: req.body.applicationId,
                    contractInfo: req.body.contractInfo,
                    sellerAddress: req.body.sellerAddress,
                    assetPrice: req.body.assetPrice,
                    assetPriceUnit: req.body.assetPriceUnit
                })
                res.status(201).send()
            } catch (e) {
                if (e.httpCode) res.status(e.httpCode).send(e.toJson())
                else res.status(500).send()
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['POST'])
    }
}
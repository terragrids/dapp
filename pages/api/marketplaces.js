import TokenRepository from '../../repository/token.repository'
import { setBadRequestResponseWithMissingParameter, setMethodNotAllowedResponse } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            if (!req.body) setBadRequestResponseWithMissingParameter(res, 'Request body')
            if (!req.body.assetId) setBadRequestResponseWithMissingParameter(res, 'assetId')
            if (!req.body.applicationId) setBadRequestResponseWithMissingParameter(res, 'applicationId')
            if (!req.body.contractInfo) setBadRequestResponseWithMissingParameter(res, 'contractInfo')
            if (!req.body.sellerAddress) setBadRequestResponseWithMissingParameter(res, 'sellerAddress')
            if (!req.body.assetPrice) setBadRequestResponseWithMissingParameter(res, 'assetPrice')
            if (!req.body.assetPriceUnit) setBadRequestResponseWithMissingParameter(res, 'assetPriceUnit')

            try {
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

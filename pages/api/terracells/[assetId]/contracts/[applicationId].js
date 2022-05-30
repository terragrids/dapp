import { appApproval } from '../../../../../blockchain/build/app-approval.mjs'
import ApplicationNotFoundError from '../../../../../errors/application-not-found.error'
import ApplicationStillRunningError from '../../../../../errors/application-still-running.error.js'
import AssetNotFoundError from '../../../../../errors/asset-not-found.error'
import MissingParameterError from '../../../../../errors/missing-parameter.error'
import TokenRepository from '../../../../../repository/token.repository'
import { algonodeIndexerBaseUrl, handleHttpRequest, setMethodNotAllowedResponse } from '../../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await handleHttpRequest(res, async () => {
                if (!req.query.assetId) throw new MissingParameterError('assetId')
                if (!req.query.applicationId) throw new MissingParameterError('applicationId')
                if (!req.body) throw new MissingParameterError('Request body')
                if (!req.body.contractInfo) throw new MissingParameterError('contractInfo')
                if (!req.body.sellerAddress) throw new MissingParameterError('sellerAddress')
                if (!req.body.assetPrice) throw new MissingParameterError('assetPrice')
                if (!req.body.assetPriceUnit) throw new MissingParameterError('assetPriceUnit')

                const [assetResponse, appResponse] = await Promise.all([
                    fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}`),
                    fetch(`${algonodeIndexerBaseUrl}/applications/${req.query.applicationId}`)
                ])

                const [{ asset }, { application }] = await Promise.all([assetResponse.json(), appResponse.json()])

                if (!asset || asset.params['unit-name'] !== 'TRCL') {
                    throw new AssetNotFoundError()
                }

                if (!application || application.params['approval-program'] !== appApproval) {
                    throw new ApplicationNotFoundError()
                }

                await new TokenRepository().putTokenContract({
                    assetId: req.query.assetId,
                    applicationId: req.query.applicationId,
                    contractInfo: req.body.contractInfo,
                    sellerAddress: req.body.sellerAddress,
                    assetPrice: req.body.assetPrice,
                    assetPriceUnit: req.body.assetPriceUnit
                })

                res.status(201).send()
            })
            break

        case 'DELETE':
            await handleHttpRequest(res, async () => {
                if (!req.query.assetId) throw new MissingParameterError('assetId')
                if (!req.query.applicationId) throw new MissingParameterError('applicationId')

                const [assetResponse, appResponse] = await Promise.all([
                    fetch(`${algonodeIndexerBaseUrl}/assets/${req.query.assetId}`),
                    fetch(`${algonodeIndexerBaseUrl}/applications/${req.query.applicationId}`)
                ])

                const [{ asset }, { application }] = await Promise.all([assetResponse.json(), appResponse.json()])

                if (!asset || asset.params['unit-name'] !== 'TRCL') {
                    throw new AssetNotFoundError()
                }

                if (application && `${application.id}` === `${req.query.applicationId}`) {
                    throw new ApplicationStillRunningError()
                }

                await new TokenRepository().deleteTokenContract(req.query.assetId)

                res.status(200).send()
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['POST', 'DELETE'])
    }
}

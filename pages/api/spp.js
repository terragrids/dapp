/* eslint-disable unicorn/filename-case */
import { setMethodNotAllowedResponse } from 'utils/api-config'
import { SPP_MOCK } from 'mocks/spp'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            // await callTerragridsApi(res, 'GET', 'spp')
            res.status(200).json(SPP_MOCK)
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

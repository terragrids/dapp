import { setMethodNotAllowedResponse, terragridsApiBaseUrl } from '../../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const response = await fetch(`${terragridsApiBaseUrl}/accounts/${req.query.accountId}/terracells`)
            if (response.status === 200) {
                res.send(await response.json())
            } else {
                res.status(response.status).end()
            }
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

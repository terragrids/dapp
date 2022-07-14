import { setMethodNotAllowedResponse } from '../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            res.status(200).end()
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

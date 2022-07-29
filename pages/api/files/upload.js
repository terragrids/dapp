import { callTerragridsApi, setMethodNotAllowedResponse } from '../../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await callTerragridsApi(res, 'POST', 'files/upload', req.body)
            break
        default:
            setMethodNotAllowedResponse(res, ['POST'])
    }
}

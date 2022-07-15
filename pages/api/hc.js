import { handleHttpRequest, setMethodNotAllowedResponse, terragridsApiBaseUrl } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await handleHttpRequest(res, async () => {
                let apiStatus
                try {
                    const apiResponse = await fetch(`${terragridsApiBaseUrl}/hc`)
                    apiStatus = apiResponse.status === 200 ? await apiResponse.json() :
                        { error: { httpStatus: apiResponse.status, httpBody: await apiResponse.text() } }
                } catch (e) {
                    apiStatus = { error: e.message }
                }

                res
                    .status(200)
                    .send({
                        api: apiStatus
                    })
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

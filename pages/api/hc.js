import IpfsRepository from '../../repository/ipfs.repository.js'
import { handleHttpRequest, setMethodNotAllowedResponse, terragridsApiBaseUrl } from '../../utils/api-config'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await handleHttpRequest(res, async () => {
                const [apiResponse, ipfsResponse] = await Promise.all([
                    fetch(`${terragridsApiBaseUrl}/hc`),
                    new IpfsRepository().testConnection()
                ].map(p => p.catch(e => e)))

                let apiStatus
                if (apiResponse instanceof Error) {
                    apiStatus = { error: apiResponse.message }
                } else {
                    apiStatus = apiResponse.status === 200 ? await apiResponse.json() :
                        { error: { httpStatus: apiResponse.status, httpBody: await apiResponse.text() } }
                }

                res
                    .status(200)
                    .send({
                        api: apiStatus,
                        ipfs: ipfsResponse
                    })
            })
            break
        default:
            setMethodNotAllowedResponse(res, ['GET'])
    }
}

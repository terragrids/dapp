export const terragridsApiBaseUrl =
    process.env.API_ENV === 'local'
        ? 'http://localhost:3003'
        : process.env.API_ENV === 'dev'
        ? 'https://api-dev.terragrids.org'
        : 'https://api.terragrids.org'

export const ipfsUrl = hash => `https://gateway.pinata.cloud/ipfs/${hash}`

const accountTerracells = accountId => `/api/accounts/${accountId}/terracells`
const terracells = next => `/api/nfts/type/trcl${next ? `?next=${next}` : ''}`
const terracellContract = (id, applicationId) => `/api/terracells/${id}/contracts/${applicationId}`
const nfts = '/api/nfts'
const nft = id => `/api/nfts/${id}`
const accountNftsByType = (accountId, symbol) => `/api/accounts/${accountId}/nfts/${symbol}`
const nftContract = (id, applicationId) => `/api/nfts/${id}/contracts/${applicationId}`
const fileUpload = '/api/files/upload'
const ipfsFiles = '/api/ipfs/files'
const terralands = next => `/api/nfts/type/trld${next ? `?next=${next}` : ''}`
const solarPowerPlant = 'api/spp'

export const endpoints = {
    accountTerracells,
    terracells,
    terracellContract,
    nfts,
    nft,
    terralands,
    accountNftsByType,
    nftContract,
    fileUpload,
    ipfsFiles,
    solarPowerPlant
}

export function setMethodNotAllowedResponse(res, allowedList) {
    res.setHeader('Allow', allowedList)
    res.status(405).end()
}

export async function callTerragridsApi(res, method, endpoint, data) {
    await handleHttpRequest(res, async () => {
        let response
        switch (method) {
            case 'GET':
                response = await fetch(`${terragridsApiBaseUrl}/${endpoint}`)
                break
            case 'POST':
                response = await httpPost(`${terragridsApiBaseUrl}/${endpoint}`, data)
                break
            case 'DELETE':
                response = await httpDelete(`${terragridsApiBaseUrl}/${endpoint}`)
                break
            default:
                res.status(405).end()
                return
        }

        const type = response.headers.get('content-type')
        const length = response.headers.get('content-length')

        res.status(response.status).send(
            length > 0 ? (type.includes('application/json') ? await response.json() : await response.text()) : ''
        )
    })
}

export async function handleHttpRequest(res, run) {
    try {
        await run()
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        res.status(500).send()
    }
}

async function httpPost(url, data = {}) {
    return await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
}

async function httpDelete(url) {
    return await fetch(url, {
        method: 'DELETE',
        referrerPolicy: 'no-referrer'
    })
}

export const terragridsApiBaseUrl =
    process.env.API_ENV === 'local'
        ? 'http://localhost:3003'
        : process.env.API_ENV === 'dev'
        ? 'https://api-dev.terragrids.org'
        : 'https://api.terragrids.org'

export const projectsApiBaseUrl =
    process.env.API_ENV === 'local'
        ? 'http://localhost:3004'
        : process.env.API_ENV === 'dev'
        ? 'https://dev.api-project-contract.terragrids.org'
        : 'https://api-project-contract.terragrids.org'

export const ipfsUrl = hash => `https://gateway.pinata.cloud/ipfs/${hash}`
export const terragridsImageUrl = name => `https://images.terragrids.org/${name}`

const accountTerracells = accountId => `api/accounts/${accountId}/terracells`
const terracells = next => `api/nfts/type/trcl${next ? `?next=${next}` : ''}`
const terracellContract = (id, applicationId) => `api/terracells/${id}/contracts/${applicationId}`
const nfts = 'api/nfts'
const nft = id => `api/nfts/${id}`
const accountNftsByType = (accountId, symbol) => `api/accounts/${accountId}/nfts/${symbol}`
const nftContract = (id, applicationId) => `api/nfts/${id}/contracts/${applicationId}`
const fileUpload = 'api/files/upload'
const ipfsFiles = 'api/ipfs/files'
const terralands = next => `api/nfts/type/trld${next ? `?next=${next}` : ''}`
const solarPowerPlant = 'api/spp'
const projects = 'api/projects'
const accountProjects = accountId => `api/accounts/${accountId}/projects`

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
    solarPowerPlant,
    projects,
    accountProjects
}

export function setMethodNotAllowedResponse(res, allowedList) {
    res.setHeader('Allow', allowedList)
    res.status(405).end()
}

export async function callTerragridsApi(res, method, endpoint, data, headers) {
    await callApi(res, terragridsApiBaseUrl, method, endpoint, data, headers)
}

export async function callProjectsApi(res, method, endpoint, data, headers) {
    await callApi(res, projectsApiBaseUrl, method, endpoint, data, headers)
}

async function callApi(res, baseUrl, method, endpoint, data, headers) {
    await handleHttpRequest(res, async () => {
        let response
        switch (method) {
            case 'GET':
                response = await fetch(`${baseUrl}/${endpoint}`)
                break
            case 'POST':
            case 'PUT':
                response = await httpRequest(method, `${baseUrl}/${endpoint}`, data, headers)
                break
            case 'DELETE':
                response = await httpRequest(method, `${baseUrl}/${endpoint}`, null, headers)
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

async function httpRequest(method, url, data = {}, headers = {}) {
    return await fetch(url, {
        method,
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        ...(data && {
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    })
}

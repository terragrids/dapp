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

export const nftsApiBaseUrl =
    process.env.API_ENV === 'local'
        ? 'http://localhost:3005'
        : process.env.API_ENV === 'dev'
        ? 'https://dev.api-nft-contract.terragrids.org'
        : 'https://api-nft-contract.terragrids.org'

export const ipfsUrl = hash => `https://gateway.pinata.cloud/ipfs/${hash}`
export const terragridsImageUrl = name => `https://images.terragrids.org/${name}`

const pageSize = 5

const accountTerracells = accountId => `api/accounts/${accountId}/terracells`
const terracells = next => `api/nfts/type/trcl${next ? `?next=${next}` : ''}`
const terracellContract = (id, applicationId) => `api/terracells/${id}/contracts/${applicationId}`
const nfts = 'api/nfts'
const nft = id => `api/nfts/${id}`
const accountNftsByType = (accountId, symbol) => `api/accounts/${accountId}/nfts/${symbol}`
const paginatedNfts = (symbol, status, nextPageKey) =>
    `api/nfts?sort=desc&symbol=${symbol}&status=${status}&pageSize=${pageSize}${
        nextPageKey ? `&nextPageKey=${nextPageKey}` : ''
    }`
const nftContract = (id, applicationId) => `api/nfts/${id}/contracts/${applicationId}`
const fileUpload = 'api/files/upload'
const ipfsFiles = 'api/ipfs/files'
const terralands = next => `api/nfts/type/trld${next ? `?next=${next}` : ''}`
const solarPowerPlant = 'api/spp'
const projects = 'api/projects'
const paginatedProjects = (nextPageKey, status) =>
    `api/projects?sort=desc&pageSize=${pageSize}${nextPageKey ? `&nextPageKey=${nextPageKey}` : ''}${
        status ? `&status=${status}` : ''
    }`
const project = id => `api/projects/${id}`
const projectApproval = id => `api/projects/${id}/approval`
const paginatedAccountProjects = (accountId, nextPageKey, status) =>
    `api/accounts/${accountId}/projects?sort=desc&pageSize=${pageSize}${
        nextPageKey ? `&nextPageKey=${nextPageKey}` : ''
    }${status ? `&status=${status}` : ''}`
const authForWallet = wallet => `api/auth?wallet=${wallet}`

export const endpoints = {
    accountTerracells,
    terracells,
    terracellContract,
    nfts,
    nft,
    paginatedNfts,
    terralands,
    accountNftsByType,
    nftContract,
    fileUpload,
    ipfsFiles,
    solarPowerPlant,
    projects,
    paginatedProjects,
    project,
    projectApproval,
    paginatedAccountProjects,
    authForWallet
}

export function setMethodNotAllowedResponse(res, allowedList) {
    res.setHeader('Allow', allowedList)
    res.status(405).end()
}

export async function callTerragridsApi(res, method, endpoint, data, headers, query) {
    await callApi(res, terragridsApiBaseUrl, method, endpoint, data, headers, query)
}

export async function callProjectsApi(res, method, endpoint, data, headers, query) {
    await callApi(res, projectsApiBaseUrl, method, endpoint, data, headers, query)
}

export async function callNftsApi(res, method, endpoint, data, headers, query) {
    await callApi(res, nftsApiBaseUrl, method, endpoint, data, headers, query)
}

async function callApi(res, baseUrl, method, endpoint, data, headers, query) {
    await handleHttpRequest(res, async () => {
        let response
        let url = `${baseUrl}/${endpoint}`
        if (query) {
            const props = []
            for (var key in query) {
                if (query.hasOwnProperty(key) && query[key] !== undefined) {
                    props.push(`${key}=${query[key]}`)
                }
            }
            const queryString = props.join('&')
            url = `${url}?${queryString}`
        }

        switch (method) {
            case 'GET':
                response = await fetch(url)
                break
            case 'POST':
            case 'PUT':
                response = await httpRequest(method, url, data, headers)
                break
            case 'DELETE':
                response = await httpRequest(method, url, null, headers)
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
        ...(headers && {
            headers: {
                ...headers,
                ...(data && { 'Content-Type': 'application/json' })
            },
            body: JSON.stringify(data)
        })
    })
}

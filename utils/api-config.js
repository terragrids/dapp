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

export const ipfsUrl = hash => `https://terragrids.infura-ipfs.io/ipfs/${hash}`
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
const paginatedProjectNfts = (projectId, nextPageKey) =>
    `api/nfts?sort=desc&projectId=${projectId}&pageSize=${pageSize}${nextPageKey ? `&nextPageKey=${nextPageKey}` : ''}`
const nftContract = (id, applicationId) => `api/nfts/${id}/contracts/${applicationId}`
const nftPurchase = id => `api/nfts/${id}/purchase`
const nftPurchaseAuth = id => `api/nfts/${id}/purchase/auth`
const fileUpload = 'api/files/upload'
const ipfsFiles = 'api/ipfs/files'
const ipfsMetadata = 'api/ipfs/metadata'
const terralands = next => `api/nfts/type/trld${next ? `?next=${next}` : ''}`
const solarPowerPlant = 'api/spp'
const places = 'api/places'
const trackers = 'api/trackers'
const readings = 'api/readings'
const paginatedPlaces = (nextPageKey, status, size = pageSize) =>
    `api/places?sort=desc&pageSize=${size}${nextPageKey ? `&nextPageKey=${nextPageKey}` : ''}${
        status ? `&status=${status}` : ''
    }`
const paginatedTrackers = (placeId, nextPageKey, status, type, size = pageSize) =>
    `api/places/${placeId}/trackers?sort=desc&pageSize=${size}${nextPageKey ? `&nextPageKey=${nextPageKey}` : ''}${
        status ? `&status=${status}` : ''
    }${type ? `&type=${type}` : ''}`
const paginatedReadings = (trackerId, nextPageKey, status, size = pageSize) =>
    `api/trackers/${trackerId}/readings?sort=desc&pageSize=${size}${nextPageKey ? `&nextPageKey=${nextPageKey}` : ''}${
        status ? `&status=${status}` : ''
    }`
const place = id => `api/places/${id}`
const tracker = id => `api/trackers/${id}`
const placeApproval = id => `api/places/${id}/approval`
const paginatedAccountPlaces = (userId, nextPageKey, status) =>
    `api/accounts/${userId}/places?sort=desc&pageSize=${pageSize}${nextPageKey ? `&nextPageKey=${nextPageKey}` : ''}${
        status ? `&status=${status}` : ''
    }`
const authForWallet = wallet => `api/auth?wallet=${wallet}`
const media = (type, rank) => `api/media/${type}${rank ? `?rank=${rank}` : ''}`
const user = 'api/user'
const login = '/api/auth/login'
const logout = '/api/auth/logout'

export const endpoints = {
    accountTerracells,
    terracells,
    terracellContract,
    nfts,
    nft,
    paginatedNfts,
    paginatedProjectNfts,
    terralands,
    accountNftsByType,
    nftContract,
    nftPurchase,
    nftPurchaseAuth,
    fileUpload,
    ipfsFiles,
    ipfsMetadata,
    solarPowerPlant,
    places,
    trackers,
    readings,
    paginatedPlaces,
    paginatedTrackers,
    paginatedReadings,
    place,
    tracker,
    placeApproval,
    paginatedAccountPlaces,
    authForWallet,
    media,
    user,
    login,
    logout
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
            case 'DELETE':
                response = await httpRequest(method, url, null, headers)
                break
            case 'POST':
            case 'PUT':
                response = await httpRequest(method, url, data, headers)
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

async function httpRequest(method, url, data = null, headers = {}) {
    const options = {
        method,
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        ...(headers && {
            headers: {
                ...headers,
                ...(data && { 'Content-Type': 'application/json' })
            },
            ...(data && { body: JSON.stringify(data) })
        })
    }

    return await fetch(url, options)
}


const randLabsEnv = process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER === 'TestNet' ? 'testnet.' : ''
const algonodeEnv = process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER === 'TestNet' ? 'testnet' : 'mainnet'
export const randLabsIndexerBaseUrl = `https://indexer.${randLabsEnv}algoexplorerapi.io/v2`
export const algonodeIndexerBaseUrl = `https://${algonodeEnv}-idx.algonode.cloud/v2`

const accountTerracells = accountId => `/api/accounts/${accountId}/terracells`
const terracells = next => `/api/terracells${next ? `?next=${next}` : ''}`
const terracell = id => `/api/terracells/${id}`

export const endpoints = {
    accountTerracells,
    terracells,
    terracell
}

export function setMethodNotAllowedResponse(res, allowedList) {
    res.setHeader('Allow', allowedList)
    res.status(405).end()
}

export function setBadRequestResponseWithMissingParameter(res, parameter) {
    res.status(400).end(`${parameter} must be specified`)
}
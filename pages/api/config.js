
const env = process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER === 'TestNet' ? 'testnet.' : ''
export const randLabsIndexerBaseUrl = `https://indexer.${env}algoexplorerapi.io/v2`
export const algorandIndexerBaseUrl = `https://algoindexer.${env}algoexplorerapi.io/v2`

const accountTerracells = accountId => `/api/accounts/${accountId}/terracells`
const terracells = next => `/api/terracells${next ? `?next=${next}` : ''}`

export const endpoints = {
    accountTerracells,
    terracells
}
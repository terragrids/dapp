
const randLabsEnv = process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER === 'TestNet' ? 'testnet.' : ''
const algonodeEnv = process.env.NEXT_PUBLIC_REACH_CONSENSUS_NETWORK_PROVIDER === 'TestNet' ? 'testnet' : 'mainnet'
export const randLabsIndexerBaseUrl = `https://indexer.${randLabsEnv}algoexplorerapi.io/v2`
export const algonodeIndexerBaseUrl = `https://${algonodeEnv}-idx.algonode.cloud/v2`
const terragridsApiBaseUrl = (
    process.env.API_ENV === 'local' ?
        'http://localhost:3003' :
        process.env.API_ENV === 'dev' ? 'https://api-dev.terragrids.org' :
            'https://api.terragrids.org'
)

const accountTerracells = accountId => `/api/accounts/${accountId}/terracells`
const terracells = next => `/api/terracells${next ? `?next=${next}` : ''}`
const terracell = id => `/api/terracells/${id}`
const terracellContract = (id, applicationId) => `/api/terracells/${id}/contracts/${applicationId}`

export const endpoints = {
    accountTerracells,
    terracells,
    terracell,
    terracellContract
}

export function setMethodNotAllowedResponse(res, allowedList) {
    res.setHeader('Allow', allowedList)
    res.status(405).end()
}

export async function callTerragridsApi(res, endpoint) {
    await handleHttpRequest(res, async () => {
        const response = await fetch(`${terragridsApiBaseUrl}/${endpoint}`)
        if (response.status === 200) {
            res.send(await response.json())
        } else {
            res.status(response.status).end()
        }
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
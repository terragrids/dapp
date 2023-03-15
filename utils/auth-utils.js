import { getAccessToken } from '@auth0/nextjs-auth0'

export async function getAuthToken(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res)
        return accessToken
    } catch (e) {
        res.status(401).send()
        return null
    }
}

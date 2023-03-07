import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function handler(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res)

        const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.ok) {
            res.status(response.status).json(await response.json())
        } else {
            res.status(response.status).send()
        }
    } catch (error) {
        res.status(error.status || 500).end(error.message)
    }
})

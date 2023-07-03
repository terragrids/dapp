import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { endpoints } from 'utils/api-config.js'

export function useFetchOrLogin() {
    const router = useRouter()
    const fetchOrLogin = useCallback(
        async (url: string, options?: RequestInit): Promise<Response> => {
            const response = await fetch(url, options)

            if (response.status === 401) {
                router.push(endpoints.login)
            }

            return response
        },
        [router]
    )

    return { fetchOrLogin }
}

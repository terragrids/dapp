import { useState, useCallback } from 'react'

export function useUser() {
    const update = useCallback(({ authenticated, walletAddress, walletBalance }) => {
        setUser(user => ({
            ...user,
            authenticated,
            walletAddress,
            walletBalance
        }))
    }, [])

    const [user, setUser] = useState({
        authenticated: false,
        update: update
    })

    return user
}
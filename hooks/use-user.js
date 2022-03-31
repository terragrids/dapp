import { useState, useCallback } from 'react'

export function useUser() {
    const update = useCallback(({ walletAccount, walletBalance }) => {
        setUser(user => ({
            ...user,
            walletAccount,
            walletBalance
        }))
    }, [])

    const [user, setUser] = useState({
        walletAccount: null,
        walletBalance: 0,
        update: update
    })

    return {
        ...user,
        authenticated: user.walletAccount !== null,
        walletAddress: user.walletAccount ? user.walletAccount.networkAccount.addr : null
    }
}
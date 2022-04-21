import { useState, useCallback } from 'react'

export function useUser() {
    const update = useCallback(({ walletAccount, walletBalance, terracells }) => {
        setUser(user => ({
            ...user,
            walletAccount,
            walletBalance,
            terracells
        }))
    }, [])

    const [user, setUser] = useState({
        walletAccount: null,
        walletBalance: 0,
        terracells: null,
        update: update
    })

    return {
        ...user,
        authenticated: user.walletAccount !== null,
        walletAddress: user.walletAccount ? user.walletAccount.networkAccount.addr : null
    }
}
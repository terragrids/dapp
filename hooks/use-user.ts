import { useState, useCallback } from 'react'
import { Terracell } from 'types/nft.js'

export type User = {
    walletAccount?: null | {
        networkAccount: {
            addr: string
        }
    }
    stdlib?: object
    walletBalance?: string
    terracells?: null | Array<Terracell>
    authenticated?: boolean
    walletAddress?: null | string
    update?: (user: User) => void
}

export function useUser() {
    const update = useCallback(({ walletAccount, walletBalance, terracells }: User) => {
        setUser(user => ({
            ...user,
            ...walletAccount && { walletAccount },
            ...walletBalance && { walletBalance },
            ...terracells && { terracells }
        }))
    }, [])

    const [user, setUser] = useState<User>({
        walletAccount: null,
        walletBalance: '0',
        terracells: null,
        update: update
    })

    return {
        ...user,
        authenticated: user.walletAccount !== null,
        walletAddress: user.walletAccount ? user.walletAccount.networkAccount.addr : null
    }
}

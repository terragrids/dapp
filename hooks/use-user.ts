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
    isAdmin?: boolean
    update?: (user: User) => void
}

export enum UserCapabilities {
    CAN_SELL,
    CAN_BUY,
    CAN_WITHDRAW
}

export function useUser() {
    const update = useCallback(({ walletAccount, walletBalance, terracells }: User) => {
        setUser(user => ({
            ...user,
            ...(walletAccount && { walletAccount }),
            ...(walletBalance && { walletBalance }),
            ...(terracells && { terracells })
        }))
    }, [])

    const [user, setUser] = useState<User>({
        walletAccount: null,
        walletBalance: '0',
        terracells: null,
        isAdmin: false,
        update: update
    })

    return {
        ...user,
        authenticated: user.walletAccount !== null,
        walletAddress: user.walletAccount ? user.walletAccount.networkAccount.addr : null,
        isAdmin:
            user.walletAccount && process.env.NEXT_PUBLIC_ADMIN_WALLETS
                ? process.env.NEXT_PUBLIC_ADMIN_WALLETS.split(',').includes(user.walletAccount.networkAccount.addr)
                : false
    }
}

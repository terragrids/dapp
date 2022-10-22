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
    token?: null | string
    update?: (user: User) => void
    setToken?: (user: User) => void
    disconnect?: () => void
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

    const setToken = useCallback(({ token }: User) => {
        setUser(user => ({
            ...user,
            ...(token && { token })
        }))
    }, [])

    const disconnect = useCallback(() => {
        setUser(user => ({
            ...user,
            walletAccount: null,
            walletBalance: '0',
            terracells: null,
            isAdmin: false,
            token: null
        }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).algorand
    }, [])

    const [user, setUser] = useState<User>({
        walletAccount: null,
        walletBalance: '0',
        terracells: null,
        isAdmin: false,
        token: null,
        update,
        setToken,
        disconnect
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

import { useState, useCallback } from 'react'
import { Terracell } from 'types/nft.js'

export const PERMISSION_ALL = 0

export type NftContract = {
    v: {
        View: { token: () => Promise<Array<{ toNumber: () => number }>> }
    }
    a: { Market: { buy: () => Promise<void> } }
}

export type User = {
    id?: string | null
    permissions: Array<number>
    walletAccount?: null | {
        networkAccount: {
            addr: string
        }
        contract: (backend: object, contractInfo: object) => NftContract
        tokenAccept: (tokenId: number) => Promise<void>
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
    const update = useCallback(({ id, permissions, walletAccount, walletBalance, terracells }: User) => {
        setUser(user => ({
            ...user,
            ...(id && { id }),
            ...(permissions && { permissions }),
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
        id: null,
        permissions: [],
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
        authenticated: user.id !== null,
        walletAddress: user.walletAccount ? user.walletAccount.networkAccount.addr : null,
        isAdmin: user.permissions?.some(p => p === PERMISSION_ALL)
    }
}

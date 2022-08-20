import { User } from 'hooks/use-user'
import { useEffect, useState, useContext, useCallback } from 'react'
import { Terracell } from 'types/nft'
import { UserContext } from 'context/user-context'
import usePrevious from 'hooks/use-previous'
import { endpoints } from 'utils/api-config'
import LoadingSpinner from './loading-spinner'
import TerracellDialog from './terracell-dialog'
import styles from './terracell-list.module.scss'

export default function TerracellList() {
    const [terracells, setTerracells] = useState<Terracell[]>()
    const [selectedTerracell, setSelectedTerracell] = useState<Terracell | null>(null)
    const user = useContext<User>(UserContext)

    const updateTerracells = useCallback(async () => {
        const response = await fetch(endpoints.terracells())
        const { assets } = await response.json()
        setTerracells(assets)
    }, [])

    const updateUserTerracells = useCallback(
        // TODO: chenge type
        async (shouldKeepFetching: any) => {
            if (!user || !user.update) return

            const response = await fetch(endpoints.accountTerracells(user.walletAddress))
            const { assets } = await response.json()

            if (shouldKeepFetching(assets)) {
                setTimeout(updateUserTerracells, 1000, shouldKeepFetching)
            } else {
                user.update({
                    terracells: assets
                })
            }
        },
        [user]
    )

    useEffect(() => {
        updateTerracells()
    }, [updateTerracells])

    const prevUser = usePrevious(user)

    useEffect(() => {
        if (user && user != prevUser && user.terracells && terracells) {
            const parsed = terracells.map(trcl => ({
                ...trcl,
                owned: user.terracells?.some(t => t.id === trcl.id)
            }))
            setTerracells(parsed)
        }
    }, [user, terracells, prevUser])

    return (
        <div className={styles.container}>
            <h2>Hello</h2>
            {!terracells && <LoadingSpinner />}
            {terracells && (
                <ul className={styles.list}>
                    {terracells.map(terracell => (
                        <li
                            key={terracell.id}
                            // Check terracell.owned by holder number
                            className={terracell.holders?.length > 0 ? styles.owned : ''}
                            onClick={() => setSelectedTerracell(terracell)}>
                            {terracell.name}
                        </li>
                    ))}
                </ul>
            )}
            <TerracellDialog
                id={selectedTerracell?.id || undefined}
                visible={!!selectedTerracell}
                onClose={() => setSelectedTerracell(null)}
            />
        </div>
    )
}

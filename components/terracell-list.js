import { useEffect, useState, useContext, useCallback } from 'react'
import { UserContext } from '../context/user-context'
import usePrevious from '../hooks/use-previous'
import { endpoints } from '../utils/api-config'
import LoadingSpinner from './loading-spinner'
import TerracellDialog from './terracell-dialog'
import styles from './terracell-list.module.scss'

export default function TerracellList() {
    const [terracells, setTerracells] = useState()
    const [selectedTerracell, setSelectedTerracell] = useState({})
    const user = useContext(UserContext)

    const updateTerracells = useCallback(async () => {
        const response = await fetch(endpoints.terracells())
        const { assets } = await response.json()
        setTerracells(assets)
    }, [])

    const updateUserTerracells = useCallback(async (shouldKeepFetching) => {
        const response = await fetch(endpoints.accountTerracells(user.walletAddress))
        const { assets } = await response.json()

        if (shouldKeepFetching(assets)) {
            setTimeout(updateUserTerracells, 1000)
        } else {
            user.update({
                terracells: assets
            })
        }
    }, [user])

    const updateUserTerracellsAfterSale = useCallback(async (upForSaleId) => {
        if (!user) return
        user.update({
            terracells: user.terracells.filter(t => t.id !== upForSaleId)
        })

        updateUserTerracells(assets => assets.some(t => t.id === upForSaleId))
    }, [updateUserTerracells, user])

    const updateUserTerracellsAfterWithdrawal = useCallback(async (withdrawnId) => {
        if (!user) return
        updateUserTerracells(assets => assets.every(t => t.id !== withdrawnId))
    }, [updateUserTerracells, user])

    useEffect(() => {
        updateTerracells()
    }, [updateTerracells])

    const prevUser = usePrevious(user)

    useEffect(() => {
        if (user && user != prevUser && user.terracells && terracells) {
            const parsed = terracells.map(trcl => ({
                ...trcl,
                owned: user.terracells.some(t => t.id === trcl.id)
            }))
            setTerracells(parsed)
        }
    }, [user, terracells, prevUser])

    return (
        <div className={styles.container}>
            {!terracells && <LoadingSpinner />}
            {terracells &&
                <ul className={styles.list}>
                    {terracells.map(asset => (
                        <li
                            key={asset.id}
                            className={asset.owned ? styles.owned : null}
                            onClick={() => setSelectedTerracell(asset)}>
                            {asset.name}
                        </li>
                    ))}
                </ul>
            }
            <TerracellDialog
                id={selectedTerracell.id}
                isAuthenticated={!!(user && user.walletAccount)}
                canSell={selectedTerracell.owned}
                visible={!!selectedTerracell.id}
                onUpForSale={updateUserTerracellsAfterSale}
                onWithdrawn={updateUserTerracellsAfterWithdrawal}
                onClose={() => setSelectedTerracell({})} />
        </div>
    )
}

import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/user-context'
import usePrevious from '../hooks/use-previous'
import { endpoints } from '../pages/api/config'
import LoadingSpinner from './loading-spinner'
import TerracellDialog from './terracell-dialog'
import styles from './terracell-list.module.scss'

export default function TerracellList() {
    const [terracells, setTerracells] = useState()
    const [selectedTerracell, setSelectedTerracell] = useState({})
    const user = useContext(UserContext)

    useEffect(() => {
        async function fetchTerracells() {
            const terracells = await fetch(endpoints.terracells())
            const { assets } = await terracells.json()
            setTerracells(assets)
        }
        fetchTerracells()
    }, [])

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
                canSell={selectedTerracell.owned}
                visible={!!selectedTerracell.id}
                onClose={() => setSelectedTerracell({})} />
        </div>
    )
}

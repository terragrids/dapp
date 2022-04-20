import { useEffect, useState } from 'react'
import { endpoints } from '../pages/api/config'
import LoadingSpinner from './loading-spinner'
import styles from './terracell-list.module.scss'

export default function TerracellList() {
    const [terracells, setTerracells] = useState()
    useEffect(() => {
        async function fetchTerracells() {
            const terracells = await fetch(endpoints.terracells())
            const { assets } = await terracells.json()
            setTerracells(assets)
        }
        fetchTerracells()
    }, [])
    return (
        <div className={styles.container}>
            {!terracells && <LoadingSpinner />}
            {terracells &&
                <ul className={styles.list}>
                    {terracells.map(asset => (
                        <li key={asset.id}>{asset.name}</li>
                    ))}
                </ul>
            }
        </div>
    )
}

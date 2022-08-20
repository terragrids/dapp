/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from 'react'
import { Terracell } from 'types/nft'
import { endpoints } from 'utils/api-config'
import LoadingSpinner from './loading-spinner'
import TerracellDialog from './terracell-dialog'
import styles from './terracell-list.module.scss'
import { strings } from 'strings/en'
import { removeSuffix, TRCL_SUFFIX } from './map/plots/plot-helpers'

/**
 * TODO:
 * - styles for small devices
 * - check if dialogue overlaping is fine (when TerracellDialog is opened)
 *   if not ok then we need to change the structure so it wont overlap
 *
 */

export default function TerracellList() {
    const [terracells, setTerracells] = useState<Terracell[]>()
    const [selectedTerracellId, setSelectedTerracellId] = useState<string | null>(null)

    const updateTerracells = useCallback(async () => {
        const response = await fetch(endpoints.terracells())
        const { assets } = await response.json()
        setTerracells(assets.map((asset: Terracell) => ({ ...asset, name: removeSuffix(asset.name, TRCL_SUFFIX) })))
    }, [])

    useEffect(() => {
        updateTerracells()
    }, [updateTerracells])

    return (
        <div className={styles.container}>
            {!terracells && <LoadingSpinner />}
            {terracells && (
                <ul className={styles.terracells}>
                    {terracells.map(terracell => (
                        <TerraCellItem
                            key={terracell.id}
                            terracell={terracell}
                            onSelectTerracell={id => setSelectedTerracellId(id)}
                        />
                    ))}
                </ul>
            )}
            <TerracellDialog
                id={selectedTerracellId || undefined}
                visible={!!selectedTerracellId}
                onClose={() => setSelectedTerracellId(null)}
            />
        </div>
    )
}

type TerraCellItemProps = {
    terracell: Terracell
    onSelectTerracell: (id: string) => void
}
const TerraCellItem = ({ terracell, onSelectTerracell }: TerraCellItemProps) => {
    const [isMouseOver, setIsMouseOver] = useState(false)

    return (
        <li
            className={styles.cell}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
            onClick={() => onSelectTerracell(terracell.id)}>
            {/* TODO: replace with Image */}
            <picture>
                <source srcSet={terracell.offchainUrl} type={'image/*'} />
                <img src={terracell.offchainUrl} alt={terracell.name} width={106} height={'auto'} />
            </picture>
            {isMouseOver && (
                <div className={styles.overlay}>
                    <small>
                        {terracell.name} <br />
                        {strings.power} {terracell.power} TRW
                    </small>
                </div>
            )}
        </li>
    )
}

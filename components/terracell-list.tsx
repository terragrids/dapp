import { User } from 'hooks/use-user'
import { useEffect, useState, useContext, useCallback } from 'react'
import { Terracell } from 'types/nft'
import { UserContext } from 'context/user-context'
import usePrevious from 'hooks/use-previous'
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
    const user = useContext<User>(UserContext)

    const updateTerracells = useCallback(async () => {
        const response = await fetch(endpoints.terracells())
        const { assets } = await response.json()
        setTerracells(assets.map((asset: Terracell) => ({ ...asset, name: removeSuffix(asset.name, TRCL_SUFFIX) })))
    }, [])

    // TODO: Do we need this?
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

    // TODO: If we dont need the above, neither does this?
    useEffect(() => {
        if (user && user != prevUser && user.terracells && terracells) {
            const parsed = terracells.map(trcl => ({
                ...trcl,
                owned: user.terracells?.some(t => t.id === trcl.id)
            }))
            setTerracells(parsed.map(asset => ({ ...asset, name: removeSuffix(asset.name, TRCL_SUFFIX) })))
        }
    }, [user, terracells, prevUser])

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

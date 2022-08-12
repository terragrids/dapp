import LoadingSpinner from 'components/loading-spinner'
import { removeSuffix, TRDL_SUFFIX } from 'components/map/plots/plot-helpers'
import ModalDialog from 'components/modal-dialog'
import React, { useEffect, useMemo, useState } from 'react'
import { strings } from 'strings/en'
import { SolarPowerPlant, Terracell } from 'types/nft'
import { endpoints } from 'utils/api-config'
import styles from './solar-power-plant-dialog.module.scss'
import TerracellDetail from './terracell-detail'

type SolarPowerPlantDialogProps = {
    visible: boolean
    onClose: () => void
}

const SolarPowerPlantDialog = ({ visible, onClose }: SolarPowerPlantDialogProps) => {
    const [solarPowerPlant, setSolarPowerPlant] = useState<SolarPowerPlant | null>(null)
    const [terracells, setTerracells] = useState<Terracell[] | null>(null)
    const [error, setError] = useState<string | null>()
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number>()

    useEffect(() => {
        const fetchSolarPowerPlantAndTerracells = async () => {
            setError(null)
            setSolarPowerPlant(null)
            setTerracells(null)

            const sppResponse = await fetch(endpoints.solarPowerPlant)
            const terracellResponse = await fetch(endpoints.terracellNfts())

            if (sppResponse.ok && terracellResponse.ok) {
                const data = await sppResponse.json()
                setSolarPowerPlant(data)

                const { assets } = await terracellResponse.json()
                setTerracells(
                    assets.map((asset: Terracell) => ({
                        ...asset,
                        name: removeSuffix(asset.name, TRDL_SUFFIX)
                    }))
                )
            } else {
                setError('error!!')
            }
        }
        fetchSolarPowerPlantAndTerracells()
    }, [])

    const availableTrclCount = useMemo(() => {
        if (!solarPowerPlant) return 0

        return solarPowerPlant.totalTrcl - solarPowerPlant.activeTrcl
    }, [solarPowerPlant])

    const onSelectTerracell = (id: number) => {
        setSelectedId(id)
        setIsDetailOpen(true)
    }

    const title = isDetailOpen ? strings.back : strings.solarPowerPlant
    const subtitle = isDetailOpen ? '' : `${availableTrclCount} $TRCL ${strings.availableToBuy}`
    const currentClassName = isDetailOpen ? styles.openDetail : styles.listDialog

    return (
        <ModalDialog visible={visible} title={title} onClose={onClose} subtitle={subtitle} className={currentClassName}>
            {!solarPowerPlant && !terracells && !error && (
                <div className={styles.loader}>
                    <LoadingSpinner />
                </div>
            )}
            {isDetailOpen && terracells ? (
                <TerracellDetail
                    terracell={terracells.find(teracell => teracell.id === selectedId)}
                    onClose={() => setIsDetailOpen(false)}
                    visible={isDetailOpen}
                />
            ) : (
                <div className={styles.container}>
                    {/* TODO : change structure of html elements */}
                    {/* <div className={styles.section}> */}
                    <ul className={styles.terracells}>
                        {terracells?.map(terracell => (
                            <TerraCell key={terracell.id} terracell={terracell} onSelectTerracell={onSelectTerracell} />
                        ))}
                    </ul>
                    {/* </div> */}
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            )}
            {solarPowerPlant && !error && !isDetailOpen && (
                <footer>
                    <span>
                        {strings.capacity} $TRCS {solarPowerPlant.totalTrcl}
                    </span>
                    <span>
                        {strings.totalOutput} {solarPowerPlant.output} TRW
                    </span>
                    {/* <p>ACTIVE $TRCL {solarPowerPlant.activeTrcl}</p>So this is not needed anymore? */}
                </footer>
            )}
        </ModalDialog>
    )
}

type TerraCellProps = {
    terracell: Terracell
    onSelectTerracell: (id: number) => void
}
const TerraCell = ({ terracell, onSelectTerracell }: TerraCellProps) => {
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
                        power: {terracell.power}
                    </small>
                </div>
            )}
        </li>
    )
}

export default SolarPowerPlantDialog

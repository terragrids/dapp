/* eslint-disable @next/next/no-img-element */
import LoadingSpinner from 'components/loading-spinner'
import ModalDialog from 'components/modal-dialog'
import TerracellList from 'components/terracell-list'
import React, { useEffect, useMemo, useState } from 'react'
import { strings } from 'strings/en'
import { SolarPowerPlant } from 'types/nft'
import { endpoints } from 'utils/api-config'
import styles from './solar-power-plant-dialog.module.scss'

type SolarPowerPlantDialogProps = {
    visible: boolean
    onClose: () => void
}

const SolarPowerPlantDialog = ({ visible, onClose }: SolarPowerPlantDialogProps) => {
    const [solarPowerPlant, setSolarPowerPlant] = useState<SolarPowerPlant | null>(null)
    const [error, setError] = useState<string | null>()
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    useEffect(() => {
        const fetchSolarPowerPlantAndTerracells = async () => {
            setError(null)
            setSolarPowerPlant(null)
            setIsDetailOpen(false)

            const sppResponse = await fetch(endpoints.solarPowerPlant)

            if (sppResponse.ok) {
                const data = await sppResponse.json()
                setSolarPowerPlant(data)
            } else {
                setError(strings.errorFechingSpp)
            }
        }
        if (visible) fetchSolarPowerPlantAndTerracells()
    }, [visible])

    const subtitle = useMemo(() => {
        if (!solarPowerPlant) return ''

        const availableCount = solarPowerPlant.totalTerracells - solarPowerPlant.activeTerracells || 0
        return `${availableCount} $TRCL ${strings.availableToBuy}`
    }, [solarPowerPlant])

    const title = isDetailOpen ? strings.back : strings.solarPowerPlant
    const currentClassName = isDetailOpen ? styles.openDetail : styles.listDialog

    return (
        <ModalDialog visible={visible} title={title} onClose={onClose} subtitle={subtitle} className={currentClassName}>
            {!solarPowerPlant && !error && (
                <div className={styles.loader}>
                    <LoadingSpinner />
                </div>
            )}

            {solarPowerPlant && !error && (
                <>
                    <div className={styles.terracellList}>
                        <TerracellList />
                    </div>
                    <footer className={styles.footer}>
                        <span>
                            {strings.capacity} {solarPowerPlant.capacity || 0} TRW
                        </span>
                        <span>
                            {strings.totalOutput} {solarPowerPlant.output || 0} TRW
                        </span>
                    </footer>
                </>
            )}
        </ModalDialog>
    )
}

export default SolarPowerPlantDialog

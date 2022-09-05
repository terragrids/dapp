import LoadingSpinner from 'components/loading-spinner'
import ModalDialog from 'components/modal-dialog'
import { useSppViewer } from 'hooks/use-spp-viewer.js'
import React, { useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { SolarPowerPlant } from 'types/nft'
import { endpoints } from 'utils/api-config'
import styles from './solar-power-plant-dialog.module.scss'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user'

type SolarPowerPlantAdminPanelProps = {
    visible: boolean
    onClose: () => void
}

const SolarPowerPlantDialog = ({ visible, onClose }: SolarPowerPlantAdminPanelProps) => {
    const [solarPowerPlant, setSolarPowerPlant] = useState<SolarPowerPlant | null>(null)
    const [error, setError] = useState<string | null>()
    const { authenticated, isAdmin } = useContext<User>(UserContext)

    const { getSpp } = useSppViewer()

    useEffect(() => {
        const fetchSolarPowerPlant = async () => {
            setError(null)
            setSolarPowerPlant(null)

            const sppResponse = await fetch(endpoints.solarPowerPlant)

            if (sppResponse.ok) {
                const { contractInfo } = await sppResponse.json()

                try {
                    const spp: SolarPowerPlant = (await getSpp(contractInfo)) as SolarPowerPlant
                    setSolarPowerPlant(spp)
                } catch (e) {
                    setError(strings.errorFetchingSppFromContract)
                }
            } else {
                setError(strings.errorFetchingSpp)
            }
        }
        if (visible && isAdmin) fetchSolarPowerPlant()
    }, [getSpp, isAdmin, visible])

    return (
        <ModalDialog visible={visible} title={strings.solarPowerPlant} onClose={onClose}>
            {!authenticated && <div>{strings.connectToWalletToSeeSPP}</div>}

            {authenticated && !isAdmin && <div>{strings.onlyAdminWalletsCanAccess}</div>}

            {authenticated && isAdmin && !solarPowerPlant && !error && (
                <div className={styles.loader}>
                    <LoadingSpinner />
                </div>
            )}

            {authenticated && isAdmin && error && (
                <div className={styles.error}>
                    <div>{error}</div>
                </div>
            )}

            {authenticated && isAdmin && solarPowerPlant && !error && (
                <>
                    <span>
                        {strings.capacity} {solarPowerPlant.capacity || 0} TRW
                    </span>
                    <span>
                        {strings.totalOutput} {solarPowerPlant.output || 0} TRW
                    </span>
                </>
            )}
        </ModalDialog>
    )
}

export default SolarPowerPlantDialog

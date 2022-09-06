import LoadingSpinner from 'components/loading-spinner'
import ModalDialog from 'components/modal-dialog'
import { useSppViewer } from 'hooks/use-spp-viewer.js'
import React, { useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { SolarPowerPlant } from 'types/nft'
import { endpoints } from 'utils/api-config'
import styles from './solar-power-plant-admin-panel.module.scss'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user'

type SolarPowerPlantAdminPanelProps = {
    visible: boolean
    onClose: () => void
}

type Error = {
    message: string
    description?: string
}

const SolarPowerPlantAdminPanel = ({ visible, onClose }: SolarPowerPlantAdminPanelProps) => {
    const [solarPowerPlant, setSolarPowerPlant] = useState<SolarPowerPlant | null>(null)
    const [error, setError] = useState<Error | null>()
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
                    setError({
                        message: strings.errorFetchingSppFromContract,
                        description: e instanceof Error ? e.message : undefined
                    })
                }
            } else {
                setError({ message: strings.errorFetchingSpp })
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
                    <div>{error.message}</div>
                    {error.description && (
                        <>
                            <header>{strings.description}</header>
                            <pre>{error.description}</pre>
                        </>
                    )}
                </div>
            )}

            {authenticated && isAdmin && solarPowerPlant && !error && (
                <div className={styles.content}>
                    <span>
                        {strings.capacity} {solarPowerPlant.capacity || 0} TRW
                    </span>
                    <span>
                        {strings.totalOutput} {solarPowerPlant.output || 0} TRW
                    </span>
                </div>
            )}
        </ModalDialog>
    )
}

export default SolarPowerPlantAdminPanel

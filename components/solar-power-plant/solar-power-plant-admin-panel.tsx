import LoadingSpinner from 'components/loading-spinner'
import ModalDialog from 'components/modal-dialog'
import { useSppViewer } from 'hooks/use-spp-viewer.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { endpoints } from 'utils/api-config'
import styles from './solar-power-plant-admin-panel.module.scss'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user'
import Button, { ButtonType } from 'components/button'
import { useSppDeployer } from 'hooks/use-spp-deployer.js'
import { SolarPowerPlant } from 'types/spp.js'

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
    const [deploying, setDeploying] = useState<boolean>(false)
    const [contractInfo, setContractInfo] = useState<string | null>()
    const { authenticated, isAdmin } = useContext<User>(UserContext)
    const { getSpp } = useSppViewer()
    const { deploySpp } = useSppDeployer()

    const fetchSolarPowerPlant = useCallback(async () => {
        setError(null)
        setSolarPowerPlant(null)

        const sppResponse = await fetch(endpoints.solarPowerPlant)

        if (sppResponse.ok) {
            const sppJsonResponse = await sppResponse.json()
            setContractInfo(sppJsonResponse.contractInfo)

            try {
                const spp: SolarPowerPlant = (await getSpp(sppJsonResponse.contractInfo)) as SolarPowerPlant
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
    }, [getSpp])

    useEffect(() => {
        if (visible && isAdmin) fetchSolarPowerPlant()
    }, [fetchSolarPowerPlant, isAdmin, visible])

    async function deployContract() {
        setError(null)
        setDeploying(true)
        try {
            await deploySpp()
            await fetchSolarPowerPlant()
        } catch (e) {
            setError({
                message: strings.errorDeployingSppContract,
                description: e instanceof Error ? e.message : undefined
            })
        } finally {
            setDeploying(false)
        }
    }

    return (
        <ModalDialog visible={visible} title={strings.solarPowerPlant} onClose={onClose}>
            {!authenticated && <div>{strings.connectToWalletToSeeSPP}</div>}

            {authenticated && !isAdmin && !deploying && <div>{strings.onlyAdminWalletsCanAccess}</div>}

            {authenticated && isAdmin && ((!solarPowerPlant && !error) || deploying) && (
                <div className={styles.loader}>
                    <LoadingSpinner />
                </div>
            )}

            {authenticated && isAdmin && error && !deploying && (
                <div className={styles.error}>
                    <div className={styles.message}>{error.message}</div>
                    {error.description && (
                        <>
                            <div className={styles.button}>
                                <Button
                                    label={strings.redeployContract}
                                    type={ButtonType.OUTLINE}
                                    onClick={deployContract}
                                />
                            </div>
                            <header>{strings.contract}</header>
                            <pre>{contractInfo ? Buffer.from(contractInfo, 'base64').toString('ascii') : null}</pre>
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

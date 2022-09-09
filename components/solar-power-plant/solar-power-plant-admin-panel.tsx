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
import { InputField } from 'components/input-field'
import { useSppUpdater } from 'hooks/use-spp-updater.js'
import { Label } from 'components/label'
import { getApplicationAlgoExplorerUrl } from 'utils/string-utils.js'

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
    const [updating, setUpdating] = useState<boolean>(false)
    const [terminating, setTerminating] = useState<boolean>(false)
    const [contractInfo, setContractInfo] = useState<string | null>()
    const { authenticated, isAdmin } = useContext<User>(UserContext)
    const { getSpp } = useSppViewer()
    const { deploySpp, terminateSpp } = useSppDeployer()
    const { setSppCapacity } = useSppUpdater()

    const fetchSolarPowerPlant = useCallback(async () => {
        setError(null)
        setSolarPowerPlant(null)

        const sppResponse = await fetch(endpoints.solarPowerPlant)

        if (sppResponse.ok) {
            const sppJsonResponse = await sppResponse.json()

            if (!sppJsonResponse.contractInfo) {
                setError({
                    message: strings.errorNoSppContract,
                    description: strings.noContractPleaseRedeploy
                })
                return
            }

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

    function onCapacityChange(capacity: string) {
        setSolarPowerPlant(spp => ({ ...spp, capacity: parseInt(capacity) } as SolarPowerPlant))
    }

    function onOutputChange(output: string) {
        setSolarPowerPlant(spp => ({ ...spp, output: parseInt(output) } as SolarPowerPlant))
    }

    function onTotalChange(total: string) {
        setSolarPowerPlant(spp => ({ ...spp, total: parseInt(total) } as SolarPowerPlant))
    }

    function onActiveChange(active: string) {
        setSolarPowerPlant(spp => ({ ...spp, active: parseInt(active) } as SolarPowerPlant))
    }

    async function update() {
        if (!solarPowerPlant || !contractInfo) return
        setUpdating(true)
        try {
            await setSppCapacity(contractInfo, solarPowerPlant.capacity)
        } catch (e) {
            setError({
                message: strings.errorUpdatingSppContract,
                description: e instanceof Error ? e.message : undefined
            })
        }
        setUpdating(false)
    }

    async function terminate() {
        if (!solarPowerPlant || !contractInfo) return
        setTerminating(true)
        try {
            await terminateSpp(contractInfo)
        } catch (e) {
            setError({
                message: strings.errorTerminatingSppContract,
                description: e instanceof Error ? e.message : undefined
            })
        }
        setTerminating(false)
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
                    <div className={styles.section}>
                        <Label text={strings.contractId} />
                        <pre>
                            <a
                                href={getApplicationAlgoExplorerUrl(solarPowerPlant.contractId)}
                                target={'_blank'}
                                rel={'noreferrer'}>
                                {solarPowerPlant.contractId}
                            </a>
                        </pre>
                    </div>
                    <div className={styles.section}>
                        <InputField
                            initialValue={solarPowerPlant.capacity.toString()}
                            max={26}
                            label={strings.capacity}
                            type={'number'}
                            onChange={onCapacityChange}
                        />
                    </div>
                    <div className={styles.section}>
                        <InputField
                            initialValue={solarPowerPlant.output.toString()}
                            max={26}
                            label={strings.totalOutput}
                            type={'number'}
                            onChange={onOutputChange}
                        />
                    </div>
                    <div className={styles.section}>
                        <InputField
                            initialValue={solarPowerPlant.total.toString()}
                            max={26}
                            label={strings.totalTerracells}
                            type={'number'}
                            onChange={onTotalChange}
                        />
                    </div>
                    <div className={styles.section}>
                        <InputField
                            initialValue={solarPowerPlant.active.toString()}
                            max={26}
                            label={strings.activeTerracells}
                            type={'number'}
                            onChange={onActiveChange}
                        />
                    </div>
                    <div className={styles.button}>
                        <Button
                            label={strings.update}
                            type={ButtonType.OUTLINE}
                            loading={updating}
                            disabled={terminating}
                            onClick={update}
                        />
                    </div>
                    <div className={styles.button}>
                        <Button
                            label={strings.terminate}
                            type={ButtonType.OUTLINE_ALERT}
                            loading={terminating}
                            disabled={updating}
                            onClick={terminate}
                        />
                    </div>
                </div>
            )}
        </ModalDialog>
    )
}

export default SolarPowerPlantAdminPanel

import { useEffect, useState, useContext } from 'react'
import { useNftSeller } from '../hooks/use-nft-seller'
import { endpoints } from '../utils/api-config'
import { strings } from '../strings/en'
import Button from './button'
import LoadingSpinner from './loading-spinner'
import ModalDialog from './modal-dialog'
import styles from './terracell-dialog.module.scss'
import { UserContext } from '../context/user-context'

export default function TerracellDialog({ id, visible, onClose, isAuthenticated, canSell }) {
    const [terracell, setTerracell] = useState()
    const [loading, setLoading] = useState(false)
    const user = useContext(UserContext)
    const { sell, withdraw, price, unit } = useNftSeller()

    useEffect(() => {
        async function fetchTerracell() {
            const terracell = await fetch(endpoints.terracell(id))
            const { asset } = await terracell.json()
            setTerracell(asset)
        }
        if (id) {
            setLoading()
            setTerracell()
            fetchTerracell()
        }
    }, [id])

    async function sellTerracell() {
        setLoading(true)
        try {
            await sell(id, onReadyToSell)
        } catch (e) {
            // TODO handle error
            setLoading(false)
            return
        }
    }

    async function onReadyToSell({ id, info }) {
        setTerracell(trcl => ({
            ...trcl,
            contract: {
                id,
                info,
                sellerAddress: user.walletAddress,
                assetPrice: price,
                assetPriceUnit: unit
            }
        }))

        await fetch(endpoints.terracellContract(terracell.id, id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                contractInfo: info,
                sellerAddress: user.walletAddress,
                assetPrice: price,
                assetPriceUnit: unit
            })
        })
        // TODO handle response.status
        setLoading(false)
    }

    async function withdrawTerracell() {
        setLoading(true)

        try {
            await withdraw(terracell.contract.info)
        } catch (e) {
            // TODO handle error
            setLoading(false)
            return
        }

        const response = await fetch(endpoints.terracellContract(terracell.id, terracell.contract.id), {
            method: 'DELETE',
            referrerPolicy: 'no-referrer'
        })

        if (response.status === 200) {
            setTerracell(trcl => ({ ...trcl, contract: null }))
        } else {
            // TODO handle response.status
        }

        setLoading(false)
    }

    return (
        <ModalDialog
            visible={visible}
            title={'Terracell'}
            onClose={onClose}>
            <div className={styles.container}>
                {!terracell && <LoadingSpinner />}
                {terracell &&
                    <>
                        <div className={styles.message}>{terracell.name}</div>
                        <pre className={styles.info}>{`id: ${terracell.id}`}</pre>
                        {terracell.contract &&
                            <div className={styles.contract}>
                                <header>{strings.terracellOnTheMarket}</header>
                                <div className={styles.info}>
                                    <pre>{strings.contractId}</pre>
                                    <pre>{terracell.contract.id}</pre>
                                </div>
                            </div>
                        }
                        {canSell && !terracell.contract &&
                            <div className={styles.action}>
                                <Button loading={loading} label={strings.sell} onClick={sellTerracell} />
                            </div>
                        }
                        {isAuthenticated && terracell.contract && terracell.contract.info && terracell.contract.sellerAddress === user.walletAddress &&
                            <div className={styles.action}>
                                <Button loading={loading} label={strings.withdraw} onClick={withdrawTerracell} />
                            </div>
                        }
                    </>
                }
            </div>
        </ModalDialog>
    )
}

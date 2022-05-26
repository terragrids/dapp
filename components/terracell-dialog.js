import { useEffect, useState, useRef, useContext } from 'react'
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
    const user = useContext(UserContext)
    const { sell, withdraw, price, unit } = useNftSeller()
    const appIdRef = useRef()

    useEffect(() => {
        async function fetchTerracell() {
            const terracell = await fetch(endpoints.terracell(id))
            const { asset } = await terracell.json()
            setTerracell(asset)
        }
        if (id) {
            setTerracell()
            fetchTerracell()
        }
    }, [id])

    async function onReadyToSell(contract) {
        setTerracell(trcl => ({
            ...trcl,
            id: contract.id,
            contractInfo: contract.info
        }))

        await fetch(endpoints.terracellContract(terracell.id, contract.id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                contractInfo: Buffer.from(contract.info).toString('base64'),
                sellerAddress: user.walletAddress,
                assetPrice: price,
                assetPriceUnit: unit
            })
        })

        // TODO handle response.status
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
                        {terracell.contractInfo && <pre className={styles.info}>{terracell.contractInfo}</pre>}
                        {canSell &&
                            <div className={styles.action}>
                                {!terracell.contractInfo && <Button label={strings.sell} onClick={() => sell(id, onReadyToSell)} />}
                                {terracell.contractInfo && <Button label={strings.withdraw} onClick={withdraw} />}
                            </div>
                        }
                        {isAuthenticated && !canSell &&
                            <div className={styles.action}>
                                {/* TODO Store application id in a separate database */}
                                <label>Enter application id</label>
                                <input ref={appIdRef} />
                                <Button label={strings.withdraw} onClick={() => withdraw(appIdRef.current.value)} />
                            </div>
                        }
                    </>
                }
            </div>
        </ModalDialog>
    )
}

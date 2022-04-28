import { useEffect, useState } from 'react'
import { useNftSeller } from '../hooks/use-nft-seller'
import { endpoints } from '../pages/api/config'
import { strings } from '../strings/en'
import Button from './button'
import LoadingSpinner from './loading-spinner'
import ModalDialog from './modal-dialog'
import styles from './terracell-dialog.module.scss'

export default function TerracellDialog({ id, visible, onClose, canSell }) {
    const [terracell, setTerracell] = useState()
    const { sell, withdraw } = useNftSeller()

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

    function onReadyToSell(contractInfo) {
        setTerracell(trcl => ({
            ...trcl,
            contractInfo
        }))
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
                    </>
                }
            </div>
        </ModalDialog>
    )
}

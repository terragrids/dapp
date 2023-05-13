import ModalDialog from 'components/modal-dialog'
import { useEffect, useState } from 'react'
import styles from './place-details-dialog.module.scss'
import PlaceDetails from './place-details'

type PlaceDetailsDialogProps = {
    visible: boolean
    id: string
    name: string
    onUpdate: () => void
    onClose: () => void
}

const PlaceDetailsDialog = ({ visible, id, name, onClose, onUpdate }: PlaceDetailsDialogProps) => {
    const [title, setTitle] = useState(name)

    function onSetName(name: string) {
        setTitle(name)
    }

    function onUpdateName(name: string) {
        setTitle(name)
        onUpdate()
    }

    useEffect(() => {
        if (visible) setTitle('')
    }, [visible])

    return (
        <ModalDialog visible={visible} title={title} withActionBar={true} onClose={onClose}>
            <div className={styles.container}>
                <PlaceDetails
                    id={id}
                    onFetchName={onSetName}
                    onUpdateName={onUpdateName}
                    onApprove={onUpdate}
                    onArchive={onUpdate}
                />
            </div>
        </ModalDialog>
    )
}

export default PlaceDetailsDialog

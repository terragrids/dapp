import ModalDialog from 'components/modal-dialog'
import { useState } from 'react'
import styles from './place-details-dialog.module.scss'
import PlaceDetails, { UpdatedDetails } from './place-details'

type PlaceDetailsDialogProps = {
    visible: boolean
    id: string
    name: string
    onUpdate: () => void
    onClose: () => void
}

const PlaceDetailsDialog = ({ visible, id, name, onClose, onUpdate }: PlaceDetailsDialogProps) => {
    const [title, setTitle] = useState(name)

    function onUpdateHandler(place: UpdatedDetails) {
        setTitle(place.name)
        onUpdate()
    }

    return (
        <ModalDialog visible={visible} title={title} onClose={onClose}>
            <div className={styles.container}>
                <PlaceDetails id={id} onUpdate={onUpdateHandler} />
            </div>
        </ModalDialog>
    )
}

export default PlaceDetailsDialog

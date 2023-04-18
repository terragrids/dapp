import ModalDialog from 'components/modal-dialog'
import { useState } from 'react'
import styles from './place-details-dialog.module.scss'
import PlaceDetails from './place-details'

type PlaceDetailsDialogProps = {
    visible: boolean
    id: string
    name: string
    onClose: () => void
}

const PlaceDetailsDialog = ({ visible, id, name, onClose }: PlaceDetailsDialogProps) => {
    const [title, setTitle] = useState(name)
    return (
        <ModalDialog visible={visible} title={title} onClose={onClose}>
            <div className={styles.container}>
                <PlaceDetails id={id} onUpdate={place => setTitle(place.name)} />
            </div>
        </ModalDialog>
    )
}

export default PlaceDetailsDialog

import ModalDialog from 'components/modal-dialog'
import PlaceDetails from './place-details'
import styles from './place-details-dialog.module.scss'

type PlaceDetailsDialogProps = {
    visible: boolean
    id: string
    name: string
    onClose: () => void
}

const PlaceDetailsDialog = ({ visible, id, name, onClose }: PlaceDetailsDialogProps) => {
    return (
        <ModalDialog visible={visible} title={name} onClose={onClose}>
            <div className={styles.container}>
                <PlaceDetails id={id} />
            </div>
        </ModalDialog>
    )
}

export default PlaceDetailsDialog

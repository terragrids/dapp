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
    const [bottomScrollCounter, setBottomScrollCounter] = useState(0)

    function onSetName(name: string) {
        setTitle(name)
    }

    function onUpdateName(name: string) {
        setTitle(name)
        onUpdate()
    }

    function onScrollToBottom() {
        setBottomScrollCounter(counter => counter + 1)
    }

    useEffect(() => {
        if (visible) setTitle('')
    }, [visible])

    return (
        <ModalDialog
            visible={visible}
            title={title}
            withActionBar={true}
            onClose={onClose}
            onScrollToBottom={onScrollToBottom}>
            <div className={styles.container}>
                <PlaceDetails
                    id={id}
                    bottomScrollCounter={bottomScrollCounter}
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

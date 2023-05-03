import ModalDialog from 'components/modal-dialog'
import { useContext, useState } from 'react'
import styles from './place-details-dialog.module.scss'
import PlaceDetails, { UpdatedDetails } from './place-details'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { endpoints } from 'utils/api-config.js'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user'

type PlaceDetailsDialogProps = {
    visible: boolean
    id: string
    name: string
    onUpdate: () => void
    onClose: () => void
}

const PlaceDetailsDialog = ({ visible, id, name, onClose, onUpdate }: PlaceDetailsDialogProps) => {
    const [title, setTitle] = useState(name)
    const { fetchOrLogin } = useFetchOrLogin()
    const user = useContext<User>(UserContext)

    function onUpdateHandler(place: UpdatedDetails) {
        setTitle(place.name)
        onUpdate()
    }

    async function onArchive() {
        const response = await fetchOrLogin(endpoints.place(id), {
            method: 'DELETE',
            referrerPolicy: 'no-referrer'
        })

        if (!response.ok) {
        }
    }

    return (
        <ModalDialog
            visible={visible}
            title={title}
            onArchive={user && user.isAdmin ? onArchive : null}
            onClose={onClose}>
            <div className={styles.container}>
                <PlaceDetails id={id} onUpdate={onUpdateHandler} />
            </div>
        </ModalDialog>
    )
}

export default PlaceDetailsDialog

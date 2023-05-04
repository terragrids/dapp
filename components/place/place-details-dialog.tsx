import ModalDialog from 'components/modal-dialog'
import { useContext, useEffect, useState } from 'react'
import styles from './place-details-dialog.module.scss'
import PlaceDetails, { UpdatedDetails } from './place-details'
import { useFetchOrLogin } from 'hooks/use-fetch-or-login'
import { endpoints } from 'utils/api-config.js'
import { UserContext } from 'context/user-context'
import { User } from 'hooks/use-user'
import { strings } from 'strings/en.js'
import LoadingSpinner from 'components/loading-spinner.js'

type PlaceDetailsDialogProps = {
    visible: boolean
    id: string
    name: string
    onUpdate: () => void
    onClose: () => void
}

const PlaceDetailsDialog = ({ visible, id, name, onClose, onUpdate }: PlaceDetailsDialogProps) => {
    const [title, setTitle] = useState(name)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { fetchOrLogin } = useFetchOrLogin()
    const user = useContext<User>(UserContext)

    function onUpdateHandler(place: UpdatedDetails) {
        setTitle(place.name)
        onUpdate()
    }

    async function onArchive() {
        setError(null)
        setLoading(true)

        const response = await fetchOrLogin(endpoints.place(id), {
            method: 'DELETE',
            referrerPolicy: 'no-referrer'
        })

        setLoading(false)

        if (response.ok) {
            onUpdate()
            onClose()
        } else {
            setError(strings.errorArchivingPlace)
        }
    }

    useEffect(() => {
        if (visible) {
            setError(null)
            setLoading(false)
        }
    }, [visible])

    return (
        <ModalDialog
            visible={visible}
            title={title}
            onArchive={user && user.isAdmin ? onArchive : null}
            onClose={onClose}>
            <div className={styles.container}>
                {loading && <LoadingSpinner />}
                {error && <div className={styles.error}>{error}</div>}
                <PlaceDetails id={id} onUpdate={onUpdateHandler} />
            </div>
        </ModalDialog>
    )
}

export default PlaceDetailsDialog

import ModalDialog from './modal-dialog'
import styles from './loading-dialog.module.scss'
import PropTypes from 'prop-types'
import LoadingSpinner from './loading-spinner'

export default function LoadingDialog({ visible, title, message }) {
    return (
        <ModalDialog
            visible={visible}
            title={title}>
            <div className={styles.container}>
                <div className={styles.message}>{message}</div>
                <div className={styles.loading}><LoadingSpinner /></div>
            </div>
        </ModalDialog>
    )
}

LoadingDialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string
}
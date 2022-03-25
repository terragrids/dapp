import styles from './modal-dialog.module.scss'
import PropTypes from 'prop-types'

export default function ModalDialog({ visible, title, children, onClose }) {
    return visible ? (
        <div className={styles.container}>
            <div className={styles.dialog}>
                <header className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <div><i className={`${styles.close} icon-cross`} onClick={onClose} /></div>
                </header>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    ) : ''
}

ModalDialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func
}
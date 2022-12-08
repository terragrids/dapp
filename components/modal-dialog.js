import styles from './modal-dialog.module.scss'
import PropTypes from 'prop-types'

export default function ModalDialog({ visible, title, children, subtitle, className, onClose, onScroll }) {
    return visible ? (
        <div className={styles.container}>
            <div className={`${styles.dialog} ${className ? className : ''}`}>
                {(title || onClose) && (
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            {title}
                            {subtitle && <small>{subtitle}</small>}
                        </h1>

                        {onClose && (
                            <div>
                                <i className={`${styles.close} icon-cross`} onClick={onClose} />
                            </div>
                        )}
                    </header>
                )}
                <section className={styles.content} onScroll={onScroll}>
                    {children}
                </section>
            </div>
        </div>
    ) : (
        <div />
    )
}

ModalDialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func,
    onScroll: PropTypes.func
}

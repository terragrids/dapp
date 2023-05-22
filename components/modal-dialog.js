import styles from './modal-dialog.module.scss'
import PropTypes from 'prop-types'

export default function ModalDialog({
    visible,
    title,
    children,
    subtitle,
    className,
    withActionBar = false,
    onClose,
    onScrolledToBottom
}) {
    function handleScroll(e) {
        const margin = 10
        const scroll = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - margin
        const bottom = scroll <= e.currentTarget.clientHeight
        if (bottom && onScrolledToBottom) {
            onScrolledToBottom()
        }
    }

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
                            <div className={styles.controls}>
                                <i className={`${styles.close} icon-cross`} onClick={onClose} />
                            </div>
                        )}
                    </header>
                )}
                <section
                    className={`${styles.content} ${withActionBar ? styles.withActionBar : ''}`}
                    onScroll={handleScroll}>
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
    onScrolledToBottom: PropTypes.func
}

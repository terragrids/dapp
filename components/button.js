import PropTypes from 'prop-types'
import styles from './button.module.scss'
import LoadingSpinner from './loading-spinner'

export default function Button({ label, loading = false, disabled = false, onClick }) {
    return (
        <button
            className={styles.this}
            onClick={onClick}
            disabled={disabled || loading}>
            {loading && <LoadingSpinner />}
            {!loading && label}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func
}
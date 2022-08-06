import PropTypes from 'prop-types'
import styles from './button.module.scss'
import LoadingSpinner from './loading-spinner'

export default function Button({ label, loading = false, checked = false, disabled = false, className = '', onClick }) {
    return (
        <button
            className={`${styles.this} ${className} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
            disabled={disabled || loading || checked}>
            {loading && <LoadingSpinner small />}
            {checked && <i className={'icon-check'} />}
            {!loading && !checked && label}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func
}

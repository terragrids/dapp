import PropTypes from 'prop-types'
import styles from './button.module.scss'

export default function Button({ label, onClick }) {
    return (
        <button
            className={styles.this}
            onClick={onClick}>
            {label}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func
}
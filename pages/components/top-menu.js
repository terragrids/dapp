import { strings } from '../../strings/en'
import styles from './top-menu.module.scss'
import PropTypes from 'prop-types'

export default function TopMenu({ onConnectWalletClicked }) {
    return (
        <nav>
            <ul className={styles.top}>
                <li className={styles.brand} onClick={onConnectWalletClicked}>{strings.connectWallet}</li>
            </ul>
        </nav>
    )
}

TopMenu.propTypes = {
    onConnectWalletClicked: PropTypes.func
}
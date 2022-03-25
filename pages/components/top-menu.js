import { strings } from '../../strings/en'
import styles from './top-menu.module.scss'
import PropTypes from 'prop-types'
import { UserContext } from '../context/user-context'
import { useContext } from 'react'
import { maskWalletAddress } from '../utils/string-utils'

export default function TopMenu({ onConnectWalletClicked }) {
    const user = useContext(UserContext)
    return (
        <nav>
            <ul className={styles.top}>
                {user.authenticated &&
                    <li className={styles.brand}>{maskWalletAddress(user.walletAddress)} | {user.walletBalance} ALGO</li>
                }
                {!user.authenticated &&
                    <li className={styles.brand} onClick={onConnectWalletClicked}>{strings.connectWallet}</li>
                }
            </ul>
        </nav>
    )
}

TopMenu.propTypes = {
    onConnectWalletClicked: PropTypes.func
}
import { strings } from '../strings/en'
import styles from './top-menu.module.scss'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import PropTypes from 'prop-types'

export default function TopMenu({ mainMenuVisible, onConnectWallet, onToggleMenu }) {
    const user = useContext(UserContext)

    return (
        <nav>
            <ul className={styles.top}>
                {user.authenticated && (
                    <>
                        <li>
                            <button className={styles.brand} onClick={onToggleMenu}>
                                {maskWalletAddress(user.walletAddress)} | {user.walletBalance} ALGO
                            </button>
                        </li>
                        <li className={styles.toggle_menu} onClick={onToggleMenu}>
                            <button>
                                <i className={mainMenuVisible ? 'icon-cross' : 'icon-menu'} />
                            </button>
                        </li>
                    </>
                )}
                {!user.authenticated && (
                    <>
                        <li>
                            <button className={styles.brand} onClick={onConnectWallet}>
                                {strings.connectWallet}
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
TopMenu.propTypes = {
    mainMenuVisible: PropTypes.bool,
    onToggleMenu: PropTypes.func,
    onConnectWallet: PropTypes.func
}

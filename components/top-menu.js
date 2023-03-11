import { strings } from '../strings/en'
import styles from './top-menu.module.scss'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import PropTypes from 'prop-types'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function TopMenu({ mainMenuVisible, onToggleMenu }) {
    const algoUser = useContext(UserContext)
    const { user } = useUser()

    return (
        <nav>
            <ul className={styles.top}>
                {algoUser.authenticated && (
                    <>
                        <li>
                            <button className={styles.brand} onClick={onToggleMenu}>
                                {maskWalletAddress(algoUser.walletAddress)} | {algoUser.walletBalance} ALGO
                            </button>
                        </li>
                        <li className={styles.toggle_menu} onClick={onToggleMenu}>
                            <button>
                                <i className={mainMenuVisible ? 'icon-cross' : 'icon-menu'} />
                            </button>
                        </li>
                    </>
                )}
                {!user && (
                    <>
                        <li>
                            <a className={styles.button} href={'/api/auth/login'}>
                                {strings.login}
                            </a>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <button className={styles.button} onClick={onToggleMenu}>
                                {strings.account}
                            </button>
                        </li>
                        <li className={styles.toggle_menu} onClick={onToggleMenu}>
                            <button>
                                <i className={mainMenuVisible ? 'icon-cross' : 'icon-menu'} />
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

import { strings } from '../strings/en'
import styles from './top-menu.module.scss'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import PropTypes from 'prop-types'
import { endpoints } from 'utils/api-config.js'

export default function TopMenu({ mainMenuVisible, onToggleMenu }) {
    const user = useContext(UserContext)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const identity = await fetch(endpoints.user)
            setLoadingUser(false)
            if (identity.ok) {
                const json = await identity.json()
                user.update({ id: json.id })
            }
        }
        if (user) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav>
            {!loadingUser && (
                <ul className={styles.top}>
                    {user.walletAddress && (
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
                                <a className={styles.button} href={'/api/auth/login'}>
                                    {strings.login}
                                </a>
                            </li>
                        </>
                    )}
                    {user.authenticated && (
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
            )}
        </nav>
    )
}
TopMenu.propTypes = {
    mainMenuVisible: PropTypes.bool,
    onToggleMenu: PropTypes.func,
    onConnectWallet: PropTypes.func
}

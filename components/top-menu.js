import { strings } from '../strings/en'
import styles from './top-menu.module.scss'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import { MenuEventContext } from '../context/menu-event-context'

export default function TopMenu() {
    const user = useContext(UserContext)
    const { onConnectWallet, onMint } = useContext(MenuEventContext)

    return (
        <nav>
            <ul className={styles.top}>
                {user.authenticated &&
                    <>
                        <li className={styles.default} onClick={onMint}>{strings.mint}</li>
                        <li className={styles.brand}>{maskWalletAddress(user.walletAddress)} | {user.walletBalance} ALGO</li>
                    </>
                }
                {!user.authenticated &&
                    <li className={styles.brand} onClick={onConnectWallet}>{strings.connectWallet}</li>
                }
            </ul>
        </nav>
    )
}

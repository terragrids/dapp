import { strings } from '../strings/en'
import styles from './top-menu.module.scss'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import { MenuEventContext } from '../context/menu-event-context'
import PropTypes from 'prop-types'


export default function TopMenu({ mainMenuVisible}) {
    const user = useContext(UserContext)
    const { onMint, onToggleMenu } = useContext(MenuEventContext)
  
  
    return (
        <nav>
            <ul className={styles.top}>
                {user.authenticated &&
                    <>
                        <li className={`${styles.default} default btn`} onClick={onMint}>{strings.mint}</li>
                        <li className={`${styles.brand} brand btn`} onClick={onToggleMenu}>{maskWalletAddress(user.walletAddress)} | {user.walletBalance} ALGO</li>
                        <li className={styles.toggle_menu} onClick={onToggleMenu} ><i className={mainMenuVisible ? 'icon-cross' : 'icon-menu'} /></li>
                    </>
                }
               
            </ul>
        </nav>
    )
}

TopMenu.propTypes = {
    mainMenuVisible: PropTypes.bool,
}
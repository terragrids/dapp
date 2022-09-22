import { useContext } from 'react'
import { strings } from '../strings/en'
import styles from './main-menu.module.scss'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import { MenuEventContext } from '../context/menu-event-context'
import PropTypes from 'prop-types'
import { Nft } from 'types/nft'

export default function MainMenu({ visible, onSelectSymbol }) {
    const { onMint, onOpenSppAdminPanel, onToggleMenu } = useContext(MenuEventContext)
    const user = useContext(UserContext)

    const openMintDialog = () => {
        onMint()
        onToggleMenu()
    }

    const openSppAdminPanel = () => {
        onOpenSppAdminPanel()
        onToggleMenu()
    }

    const openNftListDialog = symbol => {
        onSelectSymbol(symbol)
        onToggleMenu()
    }

    return visible ? (
        <nav className={styles.wrapper}>
            <header className={styles.header}>
                <h2 className={styles.title}>{strings.yourWallet}</h2>
                <i className={`${styles.close} icon-cross`} onClick={onToggleMenu} />
            </header>

            {user.authenticated && (
                <>
                    <ul>
                        <li className={`${styles.border} ${styles.static}`}>{maskWalletAddress(user.walletAddress)}</li>
                        <li className={`${styles.darker} ${styles.static}`}>
                            $ALGO <strong>{user.walletBalance}</strong>
                        </li>
                        <li onClick={() => openNftListDialog(Nft.TRCL.symbol)}>
                            {Nft.TRCL.currencySymbol} <strong>{'>'}</strong>
                        </li>
                        <li onClick={() => openNftListDialog(Nft.TRLD.symbol)}>
                            {Nft.TRLD.currencySymbol} <strong>{'>'}</strong>
                        </li>
                        <li onClick={() => openNftListDialog(Nft.TRBD.symbol)}>
                            {Nft.TRBD.currencySymbol} <strong>{'>'}</strong>
                        </li>
                    </ul>

                    {user && user.isAdmin && (
                        <ul className={styles.admin}>
                            <li className={styles.accent} onClick={() => openMintDialog()}>
                                {strings.mint}
                            </li>
                            <li onClick={() => openSppAdminPanel()}>{strings.sppAdminPanel}</li>
                        </ul>
                    )}
                    <button className={`${styles.secondary} secondary`}>{strings.disconnect}</button>
                </>
            )}
        </nav>
    ) : (
        ''
    )
}

MainMenu.propTypes = {
    visible: PropTypes.bool,
    onSelectSymbol: PropTypes.func
}

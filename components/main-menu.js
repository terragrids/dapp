import { useContext } from 'react'
import { strings } from '../strings/en'
import styles from './main-menu.module.scss'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import { MenuEventContext } from '../context/menu-event-context'
import PropTypes from 'prop-types'
import { Nft } from 'types/nft'

export default function MainMenu({ visible, onSelectSymbol }) {
    const { onMint, onToggleMenu } = useContext(MenuEventContext)
    const user = useContext(UserContext)

    const openMintDialog = () => {
        onMint()
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
                        <li>{maskWalletAddress(user.walletAddress)}</li>
                        <li>
                            $ALGO <strong>{user.walletBalance}</strong>
                        </li>
                        <li onClick={() => openNftListDialog(Nft.TRCL.symbol)}>{Nft.TRCL.currencySymbol}</li>
                        <li onClick={() => openNftListDialog(Nft.TRLD.symbol)}>{Nft.TRLD.currencySymbol}</li>
                        <li onClick={() => openNftListDialog(Nft.TRAS.symbol)}>{Nft.TRAS.currencySymbol}</li>
                    </ul>

                    <button className={styles.accent} onClick={openMintDialog}>
                        {strings.mint}
                    </button>
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

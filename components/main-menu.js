import { useContext } from 'react'
import { strings } from '../strings/en'
import styles from './main-menu.module.scss'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import PropTypes from 'prop-types'
import { Nft } from 'types/nft'

export default function MainMenu({
    visible,
    onSelectSymbol,
    onMint,
    onDisconnectWallet,
    onOpenSppAdminPanel,
    onOpenMyProjects,
    onCreateProject,
    onToggleMenu
}) {
    const user = useContext(UserContext)

    const openMintDialog = () => {
        onMint()
        onToggleMenu()
    }

    const disconnectWallet = () => {
        onDisconnectWallet()
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

    const openMyProjects = () => {
        onOpenMyProjects()
        onToggleMenu()
    }

    const createProject = () => {
        onCreateProject()
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

                    <ul className={styles.actions}>
                        <li onClick={openMyProjects}>{strings.myProjects}</li>
                        <li onClick={createProject}>{strings.createProject}</li>
                        {user && user.isAdmin && (
                            <>
                                <li className={styles.accent} onClick={openMintDialog}>
                                    {strings.mint}
                                </li>
                                <li onClick={openSppAdminPanel}>{strings.sppAdminPanel}</li>
                            </>
                        )}
                    </ul>
                    <button className={`${styles.secondary} secondary`} onClick={disconnectWallet}>
                        {strings.disconnect}
                    </button>
                </>
            )}
        </nav>
    ) : (
        ''
    )
}

MainMenu.propTypes = {
    visible: PropTypes.bool,
    onSelectSymbol: PropTypes.func,
    onMint: PropTypes.func,
    onDisconnectWallet: PropTypes.func,
    onOpenSppAdminPanel: PropTypes.func,
    onToggleMenu: PropTypes.func
}

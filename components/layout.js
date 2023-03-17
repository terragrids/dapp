import { useContext, useState } from 'react'
import Head from 'next/head'
import styles from './layout.module.scss'
import Logo from '../public/images/logo+name.svg'
import { strings } from '../strings/en'
import TopMenu from './top-menu'
import PropTypes from 'prop-types'
import { UserContext } from '../context/user-context'
import MainMenu from './main-menu'
import { AccountNftsDialog } from './account-nfts-dialog'

export default function Layout({
    children,
    headerRef,
    onConnectWallet,
    onDisconnectWallet,
    onMint,
    onOpenAssets,
    onOpenMyProjects,
    onOpenProjects,
    onCreateProject
}) {
    const user = useContext(UserContext)
    const [mainMenuVisible, setMainMenuVisible] = useState(false)
    const [accountNftsDialogVisible, setAccountNftsDialogVisible] = useState(false)
    const [selectedSymbol, setSelectedSymbol] = useState({ undefined })

    function onToggleMenu() {
        setMainMenuVisible(b => !b)
    }

    const onSelectSymbol = symbol => {
        setSelectedSymbol(symbol)
        setAccountNftsDialogVisible(true)
    }

    return (
        <>
            <Head>
                <link rel={'icon'} href={'/favicon.ico'} />
                <meta name={'description'} content={strings.siteDescription} />
                <meta name={'og:title'} content={strings.siteTitle} />
                <meta property={'og:image'} content={''} />
                <meta name={'twitter:card'} content={'summary_large_image'} />
            </Head>
            <header
                className={`${styles.topbar} ${!user.walletAddress ? styles.notconnected : styles.navbar}`}
                ref={headerRef}>
                <div className={styles.navContent}>
                    <div className={styles.logowrapper}>
                        <Logo className={styles.logo} />
                        <span>TESTNET</span>
                    </div>

                    <TopMenu
                        mainMenuVisible={mainMenuVisible}
                        onToggleMenu={onToggleMenu}
                        onConnectWallet={onConnectWallet}
                    />
                </div>
            </header>
            <main className={styles.content}>
                {user && user.authenticated && (
                    <MainMenu
                        visible={mainMenuVisible}
                        onSelectSymbol={onSelectSymbol}
                        onOpenAssets={onOpenAssets}
                        onMint={onMint}
                        onDisconnectWallet={onDisconnectWallet}
                        onOpenProjects={onOpenProjects}
                        onOpenMyProjects={onOpenMyProjects}
                        onCreateProject={onCreateProject}
                        onToggleMenu={onToggleMenu}
                    />
                )}
                {children}
                <AccountNftsDialog
                    selectedSymbol={selectedSymbol}
                    visible={accountNftsDialogVisible}
                    onClose={() => setAccountNftsDialogVisible(false)}
                />
            </main>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    onConnectWallet: PropTypes.func
}

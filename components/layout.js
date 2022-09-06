import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './layout.module.scss'
import Logo from '../public/images/logo+name.svg'
import { strings } from '../strings/en'
import TopMenu from './top-menu'
import PropTypes from 'prop-types'
import { UserContext } from '../context/user-context'
import MainMenu from './main-menu'
import { MenuEventContext } from '../context/menu-event-context'
import { AccountNftsDialog } from './account-nfts-dialog'

export default function Layout({ children, headerRef }) {
    const user = useContext(UserContext)
    const { setToggleMenuAction } = useContext(MenuEventContext)
    const [mainMenuVisible, setMainMenuVisible] = useState(false)
    const [accountNftsDialogVisible, setAccountNftsDialogVisible] = useState(false)
    const [selectedSymbol, setSelectedSymbol] = useState({ undefined })

    useEffect(() => {
        setToggleMenuAction(() => setMainMenuVisible((b) => !b))
    }, [setToggleMenuAction])

    const onSelectSymbol = (symbol) => {
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
                className={`${styles.topbar} ${!user.authenticated ? styles.notconnected : styles.navbar}`}
                ref={headerRef}>
                <div className={styles.navContent}>
                    <div className={styles.logowrapper}>
                        <Logo className={styles.logo} />
                        <span>TESTNET</span>
                    </div>

                    <TopMenu mainMenuVisible={mainMenuVisible} />
                </div>
            </header>
            <main className={styles.content}>
                {user.authenticated && (
                    <MainMenu
                        visible={mainMenuVisible}
                        onSelectSymbol={onSelectSymbol}
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
    children: PropTypes.node
}

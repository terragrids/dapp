import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './layout.module.scss'
import Logo from '../public/images/logo+name.svg'
import { strings } from '../strings/en'
import TopMenu from './top-menu'
import PropTypes from 'prop-types'
import MainMenu from './main-menu'
import { MenuEventContext } from '../context/menu-event-context'
import { UserContext } from '../context/user-context'


export default function Layout({ children }) {
    const user = useContext(UserContext)
    const { onConnectWallet, onToggleMenu, setToggleMenuAction } = useContext(MenuEventContext)
    const [ mainMenuVisible, setMainMenuVisible ] = useState(false)
    
    
useEffect(() => {
    setToggleMenuAction(() => setMainMenuVisible(b => !b))
},[setToggleMenuAction])

    return (
        <>
            <Head>
                <link rel={'icon'} href={'/favicon.ico'} />
                <meta
                    name={'description'}
                    content={strings.siteDescription} />
                <meta name={'og:title'} content={strings.siteTitle} />
                <meta
                    property={'og:image'}
                    content={''} />
                <meta name={'twitter:card'} content={'summary_large_image'} />
            </Head>
            <header className={styles.navbar}>
                <div className={styles.navContent}>
                    <Logo className={styles.logo} />
                    <TopMenu mainMenuVisible={mainMenuVisible} />
                </div>
            </header>
            
            <main className={styles.content}>
            {!user.authenticated &&
                
                    <button className="brand" onClick={onConnectWallet}>{strings.connectWallet}</button>
                }
                {user.authenticated &&
                <MainMenu visible={mainMenuVisible} />
                }
            
                {children}</main>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}
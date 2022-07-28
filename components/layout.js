import Head from 'next/head'
import styles from './layout.module.scss'
import Logo from '../public/images/logo+name.svg'
import { strings } from '../strings/en'
import TopMenu from './top-menu'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { UserContext } from '../context/user-context'

export default function Layout({ children }) {
    const user = useContext(UserContext)

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
            <header className={!user.authenticated ? `${styles.notconnected}` : `${styles.navbar}`}>
                <div className={styles.navContent}>
                    <div className={styles.logowrapper}>
                    <Logo className={styles.logo} />
                    <span>TESTNET</span>
                    </div>

                    <TopMenu />
                </div>
            </header>
            <main className={styles.content}>{children}</main>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node
}
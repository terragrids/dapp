import Head from 'next/head'
import styles from './layout.module.scss'
import Logo from '../public/images/logo+name.svg'
import { strings } from '../strings/en'
import TopMenu from './top-menu'
import PropTypes from 'prop-types'

export default function Layout({ children, onConnectWalletClicked }) {
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
                    <TopMenu onConnectWalletClicked={onConnectWalletClicked} />
                </div>
            </header>
            <main className={styles.content}>{children}</main>
        </>
    )
}

TopMenu.propTypes = {
    children: PropTypes.node,
    onConnectWalletClicked: PropTypes.func
}
import { useState, useEffect, useContext } from 'react'
import { strings } from '../strings/en'
import styles from './main-menu.module.scss'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import { MenuEventContext } from '../context/menu-event-context'
import PropTypes from 'prop-types'
import { endpoints } from '../utils/api-config'
import { Nft } from 'types/nft'

export default function MainMenu({ visible }) {
    const [accountNfts, setAccountNfts] = useState({})
    const { onMint, onToggleMenu } = useContext(MenuEventContext)
    const user = useContext(UserContext)
    const [errorMessage, setErrorMessage] = useState()
    
    useEffect(() => {
        const fetchNfts = async () => {
            
            try{
                const response = await fetch(endpoints.nfts(user.walletAccount))
                const accountNfts= await response.json()
                setAccountNfts(accountNfts) 

            } catch(e){
                setErrorMessage(strings.errorAccountNfts)
                return
            }
        }

        fetchNfts()
    },[user])

    return visible ? (

        <nav className={styles.wrapper}> 
        
        <header className={styles.header}>
            <h2 className={styles.title}>{strings.yourWallet}</h2>
            <i className={`${styles.close} icon-cross`} onClick={onToggleMenu} />
        </header>

        { user.authenticated &&
        <>
            <ul>
                <li>{maskWalletAddress(user.walletAddress)}</li>
                <li>$ALGO <strong>{user.walletBalance}</strong></li>
                <li>{Nft.TRCL.currencySymbol} <strong>{accountNfts.trcl}</strong></li>
                <li>{Nft.TRLD.currencySymbol} <strong>{accountNfts.trld}</strong></li>
                <li>{Nft.TRAS.currencySymbol} <strong>{accountNfts.tras}</strong></li>
            </ul>

            <button className={styles.accent} onClick={onMint}>{strings.mint}</button>
            <button className={`${styles.secondary} secondary`}>{strings.disconnect}</button> 
        </>
        }
        {errorMessage &&
            <div className={styles.error}>{errorMessage}</div>
        }
        </nav>

    ) : ''

}

MainMenu.propTypes = {
    visible: PropTypes.bool
}

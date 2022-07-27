import { useState, useEffect, useContext } from 'react'
import { strings } from '../strings/en'
import styles from './main-menu.module.scss'
import { UserContext } from '../context/user-context'
import { maskWalletAddress } from '../utils/string-utils'
import { MenuEventContext } from '../context/menu-event-context'
import PropTypes from 'prop-types'
import { endpoints } from '../utils/api-config'

export default function MainMenu({ visible }) {
    const [accountNfts, setAccountNfts] = useState({})
    const { onToggleMenu } = useContext(MenuEventContext)
    const user = useContext(UserContext)

    useEffect(() => {
        const fetchNfts = async () => {
            
            try{
                const response = await fetch(endpoints.nfts(user.walletAccount))
                const accountNfts= await response.json()
                setAccountNfts(accountNfts) 

            } catch(e){
                console.log(e)
            }
        }

        fetchNfts()
    },[user])

    return visible ? (

        <div className={styles.wrapper}> 
        
        <header className={styles.header}>
            <h2 className={styles.title}>{strings.yourWallet}</h2>
            <i className={`${styles.close} icon-cross`} onClick={onToggleMenu} />
        </header>

        { user.authenticated &&
        <>
            <ul>
                <li>{maskWalletAddress(user.walletAddress)}</li>
                <li><a href="#">$ALGO <strong>{user.walletBalance}</strong></a></li>
                <li><a href="#">$TRCL <strong>{accountNfts.trcl}</strong></a></li>
                <li><a href="#">$TRLD <strong>{accountNfts.trld}</strong></a></li>
                <li><a href="#">$TRAS <strong>{accountNfts.tras}</strong></a></li>
            </ul>

            <ul>
               <li>{strings.mint}</li>
            </ul>
            <button className={`${styles.secondary} secondary`}>{strings.disconnect}</button> 
        </>
        }
        </div>

    ) : ''

}

MainMenu.propTypes = {
    visible: PropTypes.bool,
}
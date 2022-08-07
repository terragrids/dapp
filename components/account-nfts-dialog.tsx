import { useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import ModalDialog from './modal-dialog.js'
import styles from './account-nfts-dialog.module.scss'
//import { MenuEventContext } from '../context/menu-event-context.js'
import { endpoints } from '../utils/api-config'
//import { UserContext } from '../context/user-context'
import { Nft } from 'types/nft'

export const AccountNftsDialog = ({ visible, onClose, selectedSymbol }: Props) => {
    //const { user } = useContext(UserContext) how do I use the context with typescript?
    type Asset = {
        name: string
        symbol: string
        image: string
        description: string
        id: string
    }

    type State = {
        accountNfts?: Array<Asset>
        errorMessage: string
    }

    //type ObjectKey = keyof typeof Nft
    const [state, setState] = useState<State>({
        accountNfts: [],
        errorMessage: ''
    })

    let subtitle = ''
    let title = ''

    switch (selectedSymbol) {
        case 'TRCL':
            subtitle = `${strings.totalOutput}`
            title = Nft.TRCL.name
            break
        case 'TRLD':
            subtitle = `${strings.landPlots}`
            title = Nft.TRLD.name
            break
        case 'TRAS':
            subtitle = `${strings.totalBuildings}`
            title = Nft.TRAS.name
            break
    }

    useEffect(() => {
        const fetchNfts = async () => {
            try {
                if (visible) {
                    const response = await fetch(
                        endpoints.accountNftsByType(
                            'WILRZ5OWS6QITI57LKTRH6MAQYXSFYKRZDJZIIBOAAVLCX4JEFPF3S6LTM',
                            selectedSymbol
                        )
                    )
                    const accountNfts = await response.json()
                    //setAccountNfts(accountNfts)
                    setState(state => ({
                        ...state,
                        accountNfts: accountNfts
                    }))
                }
            } catch (e) {
                setState(state => ({
                    ...state,
                    errorMessage: strings.errorAccountNfts
                }))
                return
            }
        }

        fetchNfts()
    }, [selectedSymbol, visible])

    return visible ? (
        <ModalDialog
            visible={visible}
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            className={styles.listDialog}>
            <ul>
                <li>
                    <div className={'thumbPlaceholder'}></div>
                    <h2>
                        Terracell #1
                        <small>{strings.output}: 45 TRW</small>
                    </h2>
                </li>
            </ul>
            {state.errorMessage && <div className={styles.error}>{state.errorMessage}</div>}
        </ModalDialog>
    ) : (
        ''
    )
}

type Props = {
    visible: boolean
    selectedSymbol: string
    onClose: () => void
}

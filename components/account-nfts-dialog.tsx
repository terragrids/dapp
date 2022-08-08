import { useEffect, useState, useContext } from 'react'
import { strings } from 'strings/en.js'
import ModalDialog from './modal-dialog.js'
import styles from './account-nfts-dialog.module.scss'
import { endpoints } from '../utils/api-config'
import { UserContext } from '../context/user-context'
import { Nft } from 'types/nft'

export const AccountNftsDialog = ({ visible, onClose, selectedSymbol }: Props) => {
    const user = useContext<User>(UserContext)
    type Asset = {
        id: string
        name: string
        symbol: string
        url: string
        output: 10
    }

    type State = {
        accountNfts: Array<Asset>
        errorMessage: string
        totalOutput: number
    }

    //type ObjectKey = keyof typeof Nft
    const [state, setState] = useState<State>({
        accountNfts: [],
        errorMessage: '',
        totalOutput: 0
    })

    let subtitle = ''
    let title = ''

    switch (selectedSymbol) {
        case 'TRCL':
            subtitle = `${strings.totalOutput} ${state.totalOutput} TRW`
            title = Nft.TRCL.name
            break
        case 'TRLD':
            subtitle = `${strings.landPlots} ${state.totalOutput}`
            title = Nft.TRLD.name
            break
        case 'TRAS':
            subtitle = `${strings.totalBuildings} ${state.totalOutput}`
            title = Nft.TRAS.name
            break
    }

    useEffect(() => {
        const fetchNfts = async () => {
            try {
                const response = await fetch(endpoints.accountNftsByType(user.walletAddress, selectedSymbol))
                const accountNfts = await response.json()

                setState(state => ({
                    ...state,
                    accountNfts: accountNfts.assets,
                    totalOutput: accountNfts.totalOutput
                }))
            } catch (e) {
                setState(state => ({
                    ...state,
                    errorMessage: strings.errorAccountNfts
                }))
                return
            }
        }

        if (visible) {
            fetchNfts()
        }
    }, [selectedSymbol, visible, user])

    return visible ? (
        <ModalDialog
            visible={visible}
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            className={styles.listDialog}>
            <ul>
                {state.accountNfts.map(asset => (
                    <li key={asset.id}>
                        <div className={'thumbPlaceholder'}></div>
                        <h2>
                            {asset.name}
                            <small>{`${strings.output}: ${asset.output} TRW`}</small>
                        </h2>
                    </li>
                ))}
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

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from 'react'
import { strings } from 'strings/en.js'
import ModalDialog from './modal-dialog.js'
import styles from './account-nfts-dialog.module.scss'
import { endpoints } from '../utils/api-config'
import { UserContext } from '../context/user-context'
import { Nft } from 'types/nft'
import { User } from 'hooks/use-user'
import LoadingSpinner from './loading-spinner.js'

export const AccountNftsDialog = ({ visible, onClose, selectedSymbol }: Props) => {
    const user = useContext<User>(UserContext)
    type Asset = {
        id: string
        name: string
        symbol: string
        url: string
        offchainUrl: string
        power: 10
    }

    type State = {
        accountNfts: Array<Asset>
        errorMessage: string
        loading: boolean
    }

    const [state, setState] = useState<State>({
        accountNfts: [],
        errorMessage: '',
        loading: false
    })

    let subtitle = ''
    let title = ''

    switch (selectedSymbol) {
        case 'TRCL':
            subtitle = strings.yourSolarPvCells
            title = `${Nft.TRCL.name} (${Nft.TRCL.currencySymbol})`
            break
        case 'TRLD':
            subtitle = strings.yourPlotsOfLand
            title = `${Nft.TRLD.name} (${Nft.TRLD.currencySymbol})`
            break
        case 'TRBD':
            subtitle = strings.yourBuildings
            title = `${Nft.TRBD.name} (${Nft.TRBD.currencySymbol})`
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
                    totalOutput: accountNfts.totalOutput,
                    loading: false
                }))
            } catch (e) {
                setState(state => ({
                    ...state,
                    errorMessage: strings.errorAccountNfts,
                    loading: false
                }))
            }
        }

        if (visible) {
            fetchNfts()
        }
    }, [selectedSymbol, visible, user])

    useEffect(() => {
        setState(state => ({
            ...state,
            errorMessage: '',
            loading: true
        }))
    }, [visible])

    return (
        <ModalDialog
            visible={visible}
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            className={styles.listDialog}>
            <div className={styles.content}>
                {state.loading && <LoadingSpinner />}
                {!state.loading && state.accountNfts.length === 0 && (
                    <div>{strings.formatString(strings.youHaveNoNfts, title)}</div>
                )}
                {!state.loading && (
                    <ul>
                        {state.accountNfts.map(asset => (
                            <li key={asset.id}>
                                {/* TODO: replace with Image */}
                                <picture className={styles.thumbnail}>
                                    <source srcSet={asset.offchainUrl} type={'image/*'} />
                                    <img src={asset.offchainUrl} alt={asset.name} />
                                </picture>
                                <h2>
                                    {asset.name}
                                    <small>{`${strings.output}: ${asset.power} TRW`}</small>
                                </h2>
                            </li>
                        ))}
                    </ul>
                )}
                {state.errorMessage && <div className={styles.error}>{state.errorMessage}</div>}
            </div>
        </ModalDialog>
    )
}

type Props = {
    visible: boolean
    selectedSymbol: string
    onClose: () => void
}

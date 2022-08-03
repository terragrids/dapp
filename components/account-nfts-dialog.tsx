//import { useContext } from 'react'
import { strings } from 'strings/en.js'
import ModalDialog from './modal-dialog.js'
import styles from './account-nfts-dialog.module.scss'
//import { MenuEventContext } from '../context/menu-event-context.js'
//import { endpoints } from '../utils/api-config'
//import { Nft } from 'types/nft'

export const AccountNftsDialog = ({ visible, onClose }: Props) => {
    return visible ? (
        <ModalDialog
            visible={visible}
            title={'Your NFTs'}
            subtitle={strings.totalOutput}
            onClose={onClose}
            cssClass={styles.listDialog}
        >
            <ul>
                <li>
                    <div className={'thumbPlaceholder'}></div>
                    <h2>
                        Terracell #1
                        <small>{strings.output}: 45 TRW</small>
                    </h2>
                </li>
            </ul>
        </ModalDialog>
    ) : (
        ''
    )
}

type Props = {
    visible: boolean
    onClose: () => void
}

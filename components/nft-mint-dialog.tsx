
import { strings } from 'strings/en.js'
import ModalDialog from './modal-dialog.js'
import styles from './nft-mint-dialog.module.scss'

export const NftMintDialog = ({ visible, onClose }: Props) => {
    return (
        <ModalDialog
            visible={visible}
            title={strings.mintNft}
            onClose={onClose} >
            <div className={styles.container}></div>
        </ModalDialog>
    )
}

type Props = {
    visible: boolean
    onClose: () => void
};

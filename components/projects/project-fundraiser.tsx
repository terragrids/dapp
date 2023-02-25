import ActionBar from 'components/action-bar'
import Button, { ButtonType } from 'components/button'
import { Position2D } from 'components/map/plots/plot.js'
import ModalDialog from 'components/modal-dialog'
import NftCard from 'components/nft/nft-card'
import { useNftBuyer } from 'hooks/use-nft-buyer'
import { useState } from 'react'
import { strings } from 'strings/en.js'
import { TerragridsNft } from 'types/nft.js'
import { Project } from 'types/project.js'
import styles from './project-fundraiser.module.scss'

type Props = {
    visible: boolean
    project: Project
    nft: TerragridsNft
    selectedPlot: Position2D
    onClose: () => void
}

const ProjectFundraiser = ({ visible, project, nft, selectedPlot, onClose }: Props) => {
    const [price, setPrice] = useState(0)
    const [buying, setBuying] = useState(false)
    const [error, setError] = useState('')
    const { buy } = useNftBuyer()

    function onNftReady(nft: TerragridsNft) {
        setPrice(nft.assetPrice || 0)
    }
    async function onBuy() {
        setError('')
        setBuying(true)
        try {
            await buy(nft.id, project.id, selectedPlot.x, selectedPlot.y)
        } catch (e) {
            setError(strings.errorBuyingNft)
        }
        setBuying(false)
    }

    return visible ? (
        <>
            {!selectedPlot && (
                <div className={styles.main}>
                    <div className={styles.content}>
                        <header>
                            <i className={`${styles.close} icon-cross`} onClick={onClose} />
                        </header>
                        <div>
                            <div className={styles.message}>
                                {strings.formatString(strings.supportProjectWithNft, project.name, nft.name)}
                            </div>
                            <div className={styles.message}>{strings.pickMapPosition}</div>
                        </div>
                    </div>
                </div>
            )}
            {selectedPlot && (
                <ModalDialog
                    visible={visible}
                    title={nft.name}
                    subtitle={strings.formatString(strings.supportProjectWithNft, project.name, nft.name) as string}
                    withFooter={true}
                    error={error}
                    button1Label={`${strings.buyFor} ${price} ALGO`}
                    button1Loading={!price || buying}
                    onButton1Click={onBuy}
                    onClose={onClose}>
                    <div className={styles.body}>
                        <NftCard
                            id={nft.id}
                            positionX={selectedPlot.x}
                            positionY={selectedPlot.y}
                            onNftReady={onNftReady}
                        />
                    </div>
                </ModalDialog>
            )}
        </>
    ) : null
}

export default ProjectFundraiser

import ActionBar from 'components/action-bar'
import Button, { ButtonType } from 'components/button'
import { Position2D } from 'components/map/plots/plot.js'
import ModalDialog from 'components/modal-dialog'
import NftCard from 'components/nft/nft-card'
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

    function onNftReady(nft: TerragridsNft) {
        setPrice(nft.assetPrice || 0)
    }
    function onBuy() {
        // TODO
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
                    onClose={onClose}>
                    <div className={styles.body}>
                        <NftCard
                            id={nft.id}
                            positionX={selectedPlot.x}
                            positionY={selectedPlot.y}
                            onNftReady={onNftReady}
                        />
                        <ActionBar>
                            <Button
                                className={styles.button}
                                type={ButtonType.OUTLINE}
                                label={`${strings.buyFor} ${price} ALGO`}
                                loading={!price}
                                onClick={onBuy}
                            />
                        </ActionBar>
                    </div>
                </ModalDialog>
            )}
        </>
    ) : null
}

export default ProjectFundraiser

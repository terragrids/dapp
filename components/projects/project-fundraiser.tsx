import { Position2D } from 'components/map/plots/plot.js'
import ModalDialog from 'components/modal-dialog'
import NftCard from 'components/nft/nft-card'
import { useNftBuyer } from 'hooks/use-nft-buyer'
import { useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { TerragridsNft } from 'types/nft.js'
import { Project } from 'types/project.js'
import styles from './project-fundraiser.module.scss'

type Props = {
    visible: boolean
    project: Project
    asset: TerragridsNft
    selectedPlot: Position2D
    onClose: () => void
}

const ProjectFundraiser = ({ visible, project, asset, selectedPlot, onClose }: Props) => {
    const [nft, setNft] = useState<TerragridsNft>()
    const [buying, setBuying] = useState(false)
    const [error, setError] = useState('')
    const { buy } = useNftBuyer()

    function onNftReady(nft: TerragridsNft) {
        setNft(nft)
    }
    async function onBuy() {
        if (!nft) return
        setError('')
        setBuying(true)
        try {
            await buy(nft.id, nft.contractInfo as string, project.id, selectedPlot.x, selectedPlot.y)
        } catch (e) {
            setError(strings.errorBuyingNft)
        }
        setBuying(false)
    }

    useEffect(() => {
        if (visible) {
            setError('')
            setBuying(false)
        }
    }, [visible])

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
                                {strings.formatString(strings.supportProjectWithNft, project.name, asset.name)}
                            </div>
                            <div className={styles.message}>{strings.pickMapPosition}</div>
                        </div>
                    </div>
                </div>
            )}
            {selectedPlot && (
                <ModalDialog
                    visible={visible}
                    title={asset.name}
                    subtitle={strings.formatString(strings.supportProjectWithNft, project.name, asset.name) as string}
                    withFooter={true}
                    error={error}
                    button1Label={`${strings.buyFor} ${nft?.assetPrice} ALGO`}
                    button1Loading={!nft?.assetPrice || buying}
                    onButton1Click={onBuy}
                    onClose={onClose}>
                    <div className={styles.body}>
                        <NftCard
                            id={asset.id}
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

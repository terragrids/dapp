import { Position2D } from 'components/map/plots/plot.js'
import NftCard from 'components/nft/nft-card'
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
    return visible ? (
        <div className={`${styles.main} ${selectedPlot ? styles.narrow : ''}`}>
            <div className={`${styles.content} ${selectedPlot ? styles.narrow : ''}`}>
                <header>
                    <i className={`${styles.close} icon-cross`} onClick={onClose} />
                </header>
                <div>
                    <div className={styles.message}>
                        {strings.formatString(strings.supportProjectWithNft, project.name, nft.name)}
                    </div>
                    {!selectedPlot && <div className={styles.message}>{strings.pickMapPosition}</div>}
                    {selectedPlot && (
                        <>
                            <NftCard id={nft.id} positionX={selectedPlot.x} positionY={selectedPlot.y} />
                        </>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default ProjectFundraiser

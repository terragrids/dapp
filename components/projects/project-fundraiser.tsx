import { Position2D } from 'components/map/plots/plot.js'
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
        <div className={styles.main}>
            <div className={styles.content}>
                <div>
                    <div className={styles.message}>
                        {strings.formatString(strings.supportProjectWithNft, project.name, nft.name)}
                    </div>
                    {!selectedPlot && <div className={styles.message}>{strings.pickMapPosition}</div>}
                    {selectedPlot && (
                        <div
                            className={
                                styles.message
                            }>{`Your NFT will be placed on the plot (${selectedPlot.x},${selectedPlot.y})`}</div>
                    )}
                </div>
                <div>
                    <i className={`${styles.close} icon-cross`} onClick={onClose} />
                </div>
            </div>
        </div>
    ) : null
}

export default ProjectFundraiser

import React, { useState } from 'react'
import { strings } from 'strings/en'
import { Terracell, Terraland } from 'types/nft'
import { maskWalletAddress, truncate } from 'utils/string-utils'
import styles from './nft-info.module.scss'

const MAX_CHARS_TO_DISPLAY = 15

type NftInfoProps = {
    data: Terracell | Terraland
}

const NftInfo = ({ data }: NftInfoProps) => {
    const [showFullDescription, setShowFullDescription] = useState(false)

    function toggleDescription() {
        setShowFullDescription(show => !show)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isTerracell(data: any): data is Terracell {
        if (data == null) return false
        return typeof data.power !== 'undefined'
    }

    const dlItemClass = showFullDescription ? styles.hide : styles.dListItem

    return (
        <dl className={styles.dList}>
            <div className={dlItemClass}>
                <dt>{strings.name}</dt>
                <dd>{data.name}</dd>
            </div>

            <div className={showFullDescription ? styles.expand : styles.dListItem} onClick={toggleDescription}>
                <dt className={showFullDescription ? styles.dt : ''}>
                    {strings.description}
                    {showFullDescription && (
                        <div>
                            {/* TODO: Might better change the icon */}
                            <i className={'icon-arrow-up'} />
                        </div>
                    )}
                </dt>
                <dd className={showFullDescription ? styles.dd : ''}>
                    {showFullDescription
                        ? data.description || strings.noDescription
                        : data.description
                        ? truncate(`${data.description}`, MAX_CHARS_TO_DISPLAY)
                        : strings.noDescription}
                </dd>
            </div>

            {isTerracell(data) ? (
                <div className={dlItemClass}>
                    <dt>{strings.output}</dt>
                    <dd>{data.power || 0} TRW</dd>
                </div>
            ) : (
                <div className={dlItemClass}>
                    <dt>{strings.position}</dt>
                    <dd>
                        ({data.positionX},{data.positionY})
                    </dd>
                </div>
            )}

            <div className={dlItemClass}>
                <dt>{strings.assetID}</dt>
                <dd>{data.id}</dd>
            </div>

            <div className={dlItemClass}>
                <dt>{strings.holder}</dt>
                <dd>{maskWalletAddress(data.holders[0].address)}</dd>
            </div>

            {data.contractId && (
                <div className={dlItemClass}>
                    <dt>{strings.contractId}</dt>
                    <dd>{data.contractId}</dd>
                </div>
            )}
        </dl>
    )
}

export default NftInfo

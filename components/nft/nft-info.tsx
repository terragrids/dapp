import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user.js'
import React, { useContext, useState } from 'react'
import { strings } from 'strings/en'
import { Terrabuild, Terracell, Terraland } from 'types/nft'
import { getAssetPeraExplorerUrl, maskWalletAddress } from 'utils/string-utils'
import styles from './nft-info.module.scss'

type NftInfoProps = {
    asset: Terraland | Terrabuild | Terracell
}

const NftInfo = ({ asset }: NftInfoProps) => {
    const user = useContext<User>(UserContext)
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
                <dd>{asset.name}</dd>
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
                        ? asset.description || strings.noDescription
                        : asset.description
                        ? asset.description
                        : strings.noDescription}
                </dd>
            </div>

            {isTerracell(asset) && (
                <div className={dlItemClass}>
                    <dt>{strings.output}</dt>
                    <dd>{asset.power || 0} TRW</dd>
                </div>
            )}

            {asset.positionX && asset.positionY && (
                <div className={dlItemClass}>
                    <dt>{strings.position}</dt>
                    <dd>
                        ({asset.positionX},{asset.positionY})
                    </dd>
                </div>
            )}

            <a href={getAssetPeraExplorerUrl(asset.id)} target={'_blank'} rel={'noreferrer'} className={dlItemClass}>
                <dt>{strings.assetID}</dt>
                <dd>{asset.id}</dd>
            </a>

            <div className={dlItemClass}>
                <dt>{strings.holder}</dt>
                <dd>{maskWalletAddress(asset.holders[0].address)}</dd>
            </div>

            <div className={dlItemClass}>
                <dt>{strings.price}</dt>
                <dd>{`${asset.assetPrice} ALGO`}</dd>
            </div>

            <div className={dlItemClass}>
                <dt>{strings.rarity}</dt>
                <dd>{asset.rarity}</dd>
            </div>

            <div className={dlItemClass}>
                <dt>{strings.author}</dt>
                <dd>{asset.author}</dd>
            </div>

            {asset.contractId && (
                <div className={dlItemClass}>
                    <dt>{strings.contractId}</dt>
                    <dd>{asset.contractId}</dd>
                </div>
            )}

            {user && user.isAdmin && (
                <div className={dlItemClass}>
                    <dt>{strings.status}</dt>
                    <dd>{asset.status}</dd>
                </div>
            )}
        </dl>
    )
}

export default NftInfo

import { getAssetPeraExplorerUrl } from 'utils/string-utils.js'

type Props = {
    assetId: string
}

export const AssetLink = ({ assetId }: Props) => {
    return (
        <div>
            <a href={getAssetPeraExplorerUrl(assetId)} target={'_blank'} rel={'noreferrer'}>
                {assetId}
            </a>
        </div>
    )
}

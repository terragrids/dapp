// *********************
// TODO: REMOVE ONCE REPLACED BY terracell-dialog
// *********************
/* eslint-disable @next/next/no-img-element */
import Button from 'components/button'
import React from 'react'
import { strings } from 'strings/en'
import { Terracell } from 'types/nft'
import styles from './terracell-detail.module.scss'

type TerracellDetailProps = {
    terracell: Terracell | undefined
    visible: boolean
    onClose: () => void
}
const TerracellDetail = ({ terracell, onClose }: TerracellDetailProps) => {
    if (!terracell) return null

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <picture>
                    <source srcSet={terracell.offchainUrl} type={'image/*'} />
                    <img src={terracell.offchainUrl} alt={terracell.name} height={'auto'} />
                </picture>
            </div>
            <div className={styles.textSection}>
                <dl className={styles.dList}>
                    <div className={styles.dListItem}>
                        <dt>{strings.name}</dt>
                        <dd>{terracell.name}</dd>
                    </div>

                    <div className={styles.dListItem}>
                        <dt>{strings.description}</dt>
                        <dd>{terracell.description || strings.noDescription}</dd>
                    </div>

                    <div className={styles.dListItem}>
                        <dt>{strings.output}</dt>
                        <dd>{terracell.power} TRW</dd>
                    </div>

                    <div className={styles.dListItem}>
                        <dt>{strings.assetID}</dt>
                        <dd>{terracell.id}</dd>
                    </div>

                    <div className={styles.dListItem}>
                        <dt>{strings.price}</dt>
                        <dd>{terracell.assetPrice || 0} $ALGO</dd>
                    </div>
                </dl>
            </div>
            <div className={styles.buttonWrapper}>
                <Button
                    disabled={false}
                    label={`${strings.buyFor} ${terracell.assetPrice || 0} $ALGO`}
                    type={'outline'}
                    loading={false}
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default TerracellDetail

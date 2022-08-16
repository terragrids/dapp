/* eslint-disable @next/next/no-img-element */
import Button from 'components/button'
import { string } from 'prop-types'
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
        <>
            <span className={styles.back} onClick={onClose}>
                {strings.back}
            </span>
            <div className={styles.container}>
                {/* <div className={styles.content}> */}
                {/* <div className={styles.image}> */}
                <picture>
                    <source srcSet={terracell.offchainUrl} type={'image/*'} />
                    <img src={terracell.offchainUrl} alt={terracell.name} height={'auto'} />
                </picture>
                {/* </div> */}
                <div className={styles.stack}>
                    <dl>
                        <dt>{strings.name}</dt>
                        <dd>{terracell.name}</dd>
                        <dt>{strings.description}</dt>
                        <dd>{'tbc'}</dd>
                        <dt>{strings.output}</dt>
                        <dd>{terracell.power} TRW</dd>
                        <dt>{strings.assetID}</dt>
                        <dd>{terracell.id}</dd>
                        <dt>{strings.price}</dt>
                        <dd>{terracell.id} $ALGO</dd>
                    </dl>
                    <div className={styles.buttonWrapper}>
                        <Button
                            disabled={false}
                            label={`${strings.buy}`}
                            type={'outline'}
                            loading={false}
                            onClick={onClose}
                        />
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default TerracellDetail

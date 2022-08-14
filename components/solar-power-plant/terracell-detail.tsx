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
        <>
            <span className={styles.back} onClick={onClose}>
                {strings.back}
            </span>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.stack}>
                        <h2>{terracell.name}</h2>
                        <dl>
                            <dt>
                                Owner: <dd>{terracell.id}</dd>
                            </dt>
                            <dt>
                                Price: <dd>{terracell.id} $ALGO</dd>
                            </dt>
                            <dt>
                                Output: <dd>{terracell.power} TRW</dd>
                            </dt>
                            <dt>
                                Type: <dd>{terracell.id}</dd>
                            </dt>
                        </dl>
                        <div className={styles.buttonWrapper}>
                            <Button
                                disabled={false}
                                label={strings.buy}
                                loading={false}
                                onClick={onClose}
                                type={'outline'}
                            />
                        </div>
                    </div>
                    <div className={styles.image}>
                        <picture>
                            <source srcSet={terracell.offchainUrl} type={'image/*'} />
                            <img src={terracell.offchainUrl} alt={terracell.name} width={'190px'} height={'auto'} />
                        </picture>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TerracellDetail

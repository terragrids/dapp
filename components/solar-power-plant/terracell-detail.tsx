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
      <div className={styles.heading}>
        <div className={styles.left} onClick={onClose}>
          <p>{'< Back'}</p>
        </div>
        <div className={styles.right}>
          <div>
            <i className={`${styles.close} icon-cross`} onClick={onClose} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.stack}>
          <h2>{terracell.name}</h2>
          <dl>
            <dt>Owner:</dt>
            <dd>{terracell.id}</dd>
            <dt>Price:</dt>
            <dd>{terracell.id} $ALGO</dd>
            <dt>Output:</dt>
            <dd>{terracell.power} TW</dd>
            <dt>Type:</dt>
            <dd>{terracell.id}</dd>
          </dl>
          <Button className={styles.button} disabled={false} label={strings.buy} loading={false} onClick={onClose} />
        </div>
        <div className={styles.image}>
          <picture>
            <source srcSet={terracell.offchainUrl} type={'image/*'} />
            <img src={terracell.offchainUrl} alt={terracell.name} width={'100%'} height={'auto'} />
          </picture>
        </div>
      </div>
    </div>
  )
}

export default TerracellDetail

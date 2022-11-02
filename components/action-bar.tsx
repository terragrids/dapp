import { ReactNode } from 'react'
import styles from './action-bar.module.scss'

type Props = {
    children: ReactNode
}

const ActionBar = ({ children }: Props) => {
    return <div className={styles.this}>{children}</div>
}

export default ActionBar

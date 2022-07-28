import styles from './loading-spinner.module.scss'

export default function LoadingSpinner({ small = false }) {
    return <i role={'progressbar'} className={`${styles.ring} ${small ? styles.small : ''}`} />
}
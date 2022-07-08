import styles from './loading-spinner.module.scss'

export default function LoadingSpinner() {
    return <i role={'progressbar'} className={styles.ring} />
}
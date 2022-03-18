import { strings } from '../../strings/en'
import styles from './content.module.scss'

export default function Content() {
    return (
        <div className={styles.container}>
            {strings.helloExplorer}
        </div>
    )
}
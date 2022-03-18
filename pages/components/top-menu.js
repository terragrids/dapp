import { strings } from '../../strings/en'
import styles from './top-menu.module.scss'

export default function TopMenu() {
    return (
        <nav>
            <ul className={styles.top}>
                <li className={styles.brand}>{strings.connectWallet}</li>
            </ul>
        </nav>
    )
}
import styles from './label.module.scss'

export const Label = ({ text, forId }: Props) => {
    return <label htmlFor={forId} className={styles.container}>{text}</label>
}

type Props = {
    text: string
    forId: string
};

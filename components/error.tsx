import styles from './error.module.scss'

export const Error = ({ message }: Props) => {
    return (
        <div role={'alert'} className={styles.container} >
            <div>{message}</div>
        </div>
    )
}

type Props = {
    message: string
};

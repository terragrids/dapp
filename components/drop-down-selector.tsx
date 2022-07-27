import styles from './drop-down-selector.module.scss'

export const DropDownSelector = ({ options }: Props) => {
    return (
        <select className={styles.container} >
            {options.map(option => (
                <option
                    key={option}
                    value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

type Props = {
    options: Array<string>
};

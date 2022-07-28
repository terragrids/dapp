import { strings } from 'strings/en.js'
import uniqid from 'uniqid'
import { Label } from './label'
import styles from './drop-down-selector.module.scss'
import { useRef } from 'react'

export const DropDownSelector = ({ options, onSelected }: Props) => {
    const id = useRef(uniqid())

    function onSelectItem(event: React.ChangeEvent<HTMLSelectElement>): void {
        onSelected(event.target.value)
    }

    return (
        <>
            <Label text={strings.selectNftType} forId={id.current} />
            <select
                id={id.current}
                className={styles.container}
                onChange={onSelectItem}>
                {options.map(option => (
                    <option
                        key={option}
                        value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    )
}

type Props = {
    options: Array<string>
    onSelected: (value: string) => void
};

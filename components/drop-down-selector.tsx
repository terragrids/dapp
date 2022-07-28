import { strings } from 'strings/en.js'
import uniqid from 'uniqid'
import { Label } from './label'
import styles from './drop-down-selector.module.scss'
import { useRef } from 'react'

export type SelectOption = {
    key: string
    value: string
}

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
                        key={option.key}
                        value={option.key}>
                        {option.value}
                    </option>
                ))}
            </select>
        </>
    )
}

type Props = {
    options: Array<SelectOption>
    onSelected: (value: string) => void
};

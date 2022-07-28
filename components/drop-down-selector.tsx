import { strings } from 'strings/en.js'
import uniqid from 'uniqid'
import { Label } from './label'
import styles from './drop-down-selector.module.scss'
import { useRef } from 'react'

export const DropDownSelector = ({ options }: Props) => {
    const id = useRef(uniqid())
    return (
        <>
            <Label text={strings.selectNftType} forId={id.current} />
            <select id={id.current} className={styles.container} >
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
};

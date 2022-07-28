import uniqid from 'uniqid'
import { Label } from './label'
import styles from './input-field.module.scss'
import { useRef } from 'react'

export type SelectOption = {
    key: string
    value: string
}

export const InputField = ({ text, label, onChange }: Props) => {
    const id = useRef(uniqid())

    function onTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
        onChange(event.target.value)
    }

    return (
        <>
            <Label text={label} forId={id.current} />
            <input
                id={id.current}
                className={styles.field}
                defaultValue={text}
                onChange={onTextChange} />
        </>
    )
}

type Props = {
    text?: string
    label: string
    onChange: (value: string) => void
};

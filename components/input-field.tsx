import uniqid from 'uniqid'
import { Label } from './label'
import styles from './input-field.module.scss'
import { useRef } from 'react'

export type SelectOption = {
    key: string
    value: string
}

export const InputField = ({ text, label, multiline = false, max = 64, onChange }: Props) => {
    const id = useRef(uniqid())

    function onTextChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        onChange(event.target.value)
    }

    return (
        <>
            <Label text={label} forId={id.current} />
            {!multiline &&
                <input
                    id={id.current}
                    className={styles.field}
                    defaultValue={text}
                    maxLength={max}
                    onChange={onTextChange} />
            }

            {multiline &&
                <textarea
                    id={id.current}
                    className={styles.field}
                    defaultValue={text}
                    maxLength={max}
                    onChange={onTextChange} />
            }
        </>
    )
}

type Props = {
    text?: string
    label: string
    multiline?: boolean
    max?: number
    onChange: (value: string) => void
};

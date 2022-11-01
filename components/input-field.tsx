import uniqid from 'uniqid'
import { Label } from './label'
import styles from './input-field.module.scss'
import { useRef } from 'react'

export type SelectOption = {
    key: string
    value: string
}

type Props = {
    initialValue?: string
    label: string
    multiline?: boolean
    max?: number
    type?: string
    rows?: number
    onChange: (value: string) => void
}

export const InputField = ({
    initialValue,
    label,
    multiline = false,
    max = 64,
    rows = 5,
    type = 'text',
    onChange
}: Props) => {
    const id = useRef(uniqid())

    function onTextChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        onChange(event.target.value)
    }

    return (
        <>
            <Label text={label} forId={id.current} />
            {!multiline && (
                <input
                    id={id.current}
                    className={styles.field}
                    defaultValue={initialValue}
                    maxLength={max}
                    type={type}
                    onChange={onTextChange}
                />
            )}

            {multiline && (
                <textarea
                    id={id.current}
                    className={styles.field}
                    defaultValue={initialValue}
                    maxLength={max}
                    rows={rows}
                    onChange={onTextChange}
                />
            )}
        </>
    )
}

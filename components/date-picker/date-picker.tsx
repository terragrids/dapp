import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './date-picker.module.scss'
import { Label } from 'components/label'
import { strings } from 'strings/en.js'

type DatePickerProps = {
    start?: number
    className: string
    onChange: (date: number) => void
}

export default function DatePicker({ start, className, onChange }: DatePickerProps) {
    const [startDate, setStartDate] = useState(start ? new Date(start) : new Date())

    function handleChange(date: Date) {
        setStartDate(date)
        onChange(date.getTime())
    }

    return (
        <div className={`${styles.container} ${className}`}>
            <Label text={strings.startDate} />
            <ReactDatePicker
                className={styles.datePicker}
                selected={startDate}
                dateFormat={'MMMM d, yyyy'}
                onChange={handleChange}
            />
        </div>
    )
}

import { type DatePickerProps } from 'react-multi-date-picker'

interface ISDatePickerProps extends Omit<DatePickerProps, 'onChange'> {
    onChange: (value: Date | undefined) => void
    leftSection?: boolean
    value?: Date
    className?: string
}

export type { ISDatePickerProps }

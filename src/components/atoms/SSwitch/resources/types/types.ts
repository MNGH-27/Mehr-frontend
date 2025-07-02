import { type SwitchProps } from '@mantine/core'

interface ISSwitchProps extends Omit<SwitchProps, 'onChange' | 'value'> {
    onChange: (value: boolean) => void
    trackColor?: {
        on: string
        off: string
        disabled: string
    }
    thumbColor?: {
        on: string
        off: string
        disabled: string
    }
    value: string | boolean
}

export type { ISSwitchProps }

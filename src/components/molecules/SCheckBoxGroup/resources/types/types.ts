import { type CheckboxGroupProps } from '@mantine/core'

interface ISCheckBoxGroupProps extends Omit<CheckboxGroupProps, 'children'> {
    name: string
    options: {
        label: string
        value: string
    }[]
}

export type { ISCheckBoxGroupProps }

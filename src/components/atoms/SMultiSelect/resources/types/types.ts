import { type MultiSelectProps } from '@mantine/core'

interface ISMultiSelectProps extends MultiSelectProps {
    isLoading?: boolean
    classNames?: {
        description?: string
        dropdown?: string
        empty?: string
        error?: string
        group?: string
        groupLabel?: string
        input?: string
        label?: string
        option?: string
        options?: string
        required?: string
        root?: string
        section?: string
        wrapper?: string
    }
}

export type { ISMultiSelectProps }

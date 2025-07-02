import { type NumberInputProps } from '@mantine/core'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISNumberInputProps extends NumberInputProps {
    classNames?: {
        control?: string
        controls?: string
        description?: string
        error?: string
        input?: string
        label?: string
        required?: string
        root?: string
        section?: string
        wrapper?: string
    }
}

export type { ISNumberInputProps }

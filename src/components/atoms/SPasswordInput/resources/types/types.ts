import { type PasswordInputProps } from '@mantine/core'

interface ISPasswordInputProps extends PasswordInputProps {
    classNames?: {
        description?: string
        error?: string
        innerInput?: string
        input?: string
        label?: string
        required?: string
        root?: string
        section?: string
        visibilityToggle?: string
        wrapper?: string
    }
}

export type { ISPasswordInputProps }

import { type TextareaProps } from '@mantine/core'

interface ISTextAreaProps extends Omit<TextareaProps, 'onChange'> {
    withRightSection?: boolean
    classNames?: {
        input?: string
        section?: string
        wrapper?: string
    }
    onChange?: (event: string) => void
}

export type { ISTextAreaProps }

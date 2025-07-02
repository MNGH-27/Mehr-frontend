import { type InputHTMLAttributes } from 'react'
import { type InputProps } from '@mantine/core'

interface ISInputProps extends InputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'onChange'> {
    withRightSection?: boolean
    classNames?: {
        input?: string
        section?: string
        wrapper?: string
    }
    onChange?: (event: string) => void
    inputType?: 'persian-number' | 'english-number' | 'persian' | 'english' | 'number' | 'persian-address' | 'other'
}

export type { ISInputProps }

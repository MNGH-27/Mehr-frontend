import { type InputHTMLAttributes } from 'react'

interface ISDropZoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onDrop'> {
    onChange: (value: string | number) => void
    value: string
}

export type { ISDropZoneProps }

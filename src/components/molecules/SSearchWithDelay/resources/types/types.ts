import { type InputHTMLAttributes } from 'react'

interface ISSearchWithDelayProps extends InputHTMLAttributes<HTMLInputElement> {
    onDelayChange: (value: string | null) => void
}

export type { ISSearchWithDelayProps }

import { type TCriticalAny } from '@core/types/type-any'

interface ISInputFieldProps {
    children: React.ReactNode
    className?: string
    label?: string
    labelClassName?: string
    labelDescription?: string
    description?: string
    errors: { [key: string]: TCriticalAny }
    name: string
    required?: boolean
}

export type { ISInputFieldProps }

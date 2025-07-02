import { type ButtonHTMLAttributes, type ElementType } from 'react'

import { type TCriticalAny } from '@core/types/type-any'

import type BUTTON_SIZES from '../enums/size.enums'
import type BUTTON_VARIANTS from '../enums/variant.enums'

interface ISButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    variant: keyof typeof BUTTON_VARIANTS
    size: keyof typeof BUTTON_SIZES
    disabled?: boolean
    isLoading?: boolean
    component?: ElementType
    [key: string]: TCriticalAny
}

export type { ISButtonProps }

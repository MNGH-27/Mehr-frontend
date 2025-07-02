import { type InputHTMLAttributes } from 'react'

import { type FILLED_BOX_VARIANT } from '../enum/enum'

interface ISFilledBoxProps extends InputHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | string
    isFill?: boolean
    variant: keyof typeof FILLED_BOX_VARIANT
}

export type { ISFilledBoxProps }

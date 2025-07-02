'use client'

import { type FC } from 'react'
import { Loader } from '@mantine/core'

import { BUTTON_SIZES, BUTTON_VARIANTS, type ISButtonProps } from './resources'

const SButton: FC<ISButtonProps> = ({
    children,
    className = '',
    variant = 'FilledPrimary',
    size = 'L',
    component,
    disabled,
    isLoading,
    ...rest
}) => {
    const ComponentToRender = component || 'button'

    return (
        <ComponentToRender
            className={
                `w-full flex items-center justify-center gap-x-2 duration-200 text-center h-fit font-medium disabled:cursor-not-allowed transform-none active:scale-[98%] ${BUTTON_SIZES[size]} ${BUTTON_VARIANTS[variant]} ` +
                className
            }
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? <Loader color='gray' size={'sm'} /> : children}
        </ComponentToRender>
    )
}

export default SButton

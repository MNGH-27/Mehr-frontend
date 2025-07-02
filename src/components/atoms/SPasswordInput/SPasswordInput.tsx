'use client'

import { forwardRef } from 'react'
import { PasswordInput } from '@mantine/core'

import { type ISPasswordInputProps } from './resources'

const SPasswordInput = forwardRef<HTMLInputElement, ISPasswordInputProps>(({ classNames, value, ...rest }, ref) => {
    return (
        <PasswordInput
            autoComplete='new-password'
            classNames={{
                root: 'w-full !h-auto',
                wrapper: '!h-auto',
                innerInput: '!h-auto',
                input: `!border !border-gray-200 !h-[45px] md:!h-[50px] !rounded-lg placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary ${classNames?.input ?? ''}`
            }}
            value={value}
            ref={ref}
            {...rest}
        />
    )
})

SPasswordInput.displayName = 'SPasswordInput'

export default SPasswordInput

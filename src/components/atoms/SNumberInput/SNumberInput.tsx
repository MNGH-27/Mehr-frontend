'use client'

import { forwardRef } from 'react'
import { X } from 'lucide-react'
import { NumberInput } from '@mantine/core'

import { type ISNumberInputProps } from './resources'

const SNumberInput = forwardRef<HTMLInputElement, ISNumberInputProps>(
    ({ classNames, value, disabled = false, onChange, ...rest }, ref) => {
        return (
            <NumberInput
                ref={ref}
                classNames={{
                    root: 'w-full',
                    input: `!border-2 !border-gray-200 !rounded-lg !bg-secondary-100 !py-2 !h-auto placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary ${classNames?.input ?? ''}`
                }}
                rightSection={
                    !disabled ? (
                        <X
                            onClick={() => onChange && onChange('')}
                            style={{ display: value ? undefined : 'none' }}
                            size='20'
                            color='gray'
                            className='pointer-events-auto cursor-pointer shrink-0 ml-2'
                        />
                    ) : (
                        <></>
                    )
                }
                value={value}
                disabled={disabled}
                onChange={onChange}
                {...rest}
            />
        )
    }
)

SNumberInput.displayName = 'SNumberInput'

export default SNumberInput

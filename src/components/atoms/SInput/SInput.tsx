'use client'

import { forwardRef } from 'react'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'
import { Input } from '@mantine/core'

import { type ISInputProps } from './resources'

const SInput = forwardRef<HTMLInputElement, ISInputProps>(
    (
        {
            classNames,
            value,
            onChange,
            withRightSection = true,
            disabled = false,
            inputType = 'persian-number',
            ...rest
        },
        ref
    ) => {
        return (
            <Input
                ref={ref}
                classNames={{
                    wrapper: '!w-full',
                    input: `!border !border-gray-200 !rounded-lg !py-2 md:!py-3 !h-auto placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary ${classNames?.input ?? ''}`
                }}
                rightSection={
                    withRightSection &&
                    !disabled && (
                        <X
                            onClick={() => onChange && onChange('')}
                            style={{ display: value ? undefined : 'none' }}
                            size={20}
                            color='gray'
                            className='pointer-events-auto cursor-pointer'
                        />
                    )
                }
                disabled={disabled}
                value={value}
                onChange={(e) => {
                    if (!onChange) return

                    if (inputType === 'persian-number') {
                        if (/^[\u0600-\u06FF\u0750-\u077F0-9\s]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        } else {
                            toast.warning('لطفا به فارسی وارد کنید.', {
                                toastId: 'persian-text'
                            })
                        }
                    } else if (inputType === 'english-number') {
                        if (/^[a-zA-Z0-9\s]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        } else {
                            toast.warning('لطفا به انگلیسی وارد کنید.', {
                                toastId: 'english-text'
                            })
                        }
                    } else if (inputType === 'persian') {
                        if (/^[\u0600-\u06FF\u0750-\u077F\s]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        } else {
                            toast.warning('لطفا به فارسی وارد کنید.', {
                                toastId: 'persian-text'
                            })
                        }
                    } else if (inputType === 'english') {
                        if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        } else {
                            toast.warning('لطفا به انگلیسی وارد کنید.', {
                                toastId: 'english-text'
                            })
                        }
                    } else if (inputType === 'number') {
                        if (/^[0-9\s]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        } else {
                            toast.warning('لطفا به عدد وارد کنید.', {
                                toastId: 'number-text'
                            })
                        }
                    } else if (inputType === 'persian-address') {
                        if (/^[\u0600-\u06FF\u0660-\u0669\u06F0-\u06F90-9\s،\-]*$/.test(e.target.value)) {
                            onChange(e.target.value)
                        } else {
                            toast.warning('لطفا به فارسی وارد کنید.', {
                                toastId: 'persian-address'
                            })
                        }
                    } else if (inputType === 'other') {
                        onChange(e.target.value)
                    }
                }}
                {...rest}
            />
        )
    }
)

SInput.displayName = 'SInput'

export default SInput

'use client'

import { forwardRef } from 'react'
import { Checkbox } from '@mantine/core'

import { SCheckBox } from '@atoms/SCheckBox'

import { type ISCheckBoxGroupProps } from './resources'

const SCheckBoxGroup = forwardRef<HTMLInputElement, ISCheckBoxGroupProps>(
    ({ name, options, className = '', value, ...props }, ref) => {
        return (
            <Checkbox.Group {...props} value={value ?? []} ref={ref}>
                <div className={`w-full flex gap-5 flex-wrap ${className}`}>
                    {options.map((option) => (
                        <SCheckBox key={option.value} name={name} value={option.value} label={option.label} />
                    ))}
                </div>
            </Checkbox.Group>
        )
    }
)

SCheckBoxGroup.displayName = 'SCheckBoxGroup'

export default SCheckBoxGroup

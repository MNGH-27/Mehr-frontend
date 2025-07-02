'use client'

import { forwardRef, useState } from 'react'
import { Checkbox } from '@mantine/core'

import { type ISCheckBoxProps } from './resources'

const SCheckBox = forwardRef<HTMLInputElement, ISCheckBoxProps>(
    ({ className = '', label, value, name, ...props }, ref) => {
        const [checked, setChecked] = useState(false)

        return (
            <Checkbox
                ref={ref}
                className={`text-secondary-900 ${className}`}
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                labelPosition='left'
                name={name}
                value={value}
                label={label}
                color='#FE7C00'
                {...props}
            />
        )
    }
)

SCheckBox.displayName = 'SCheckBox'

export default SCheckBox

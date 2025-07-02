import { forwardRef } from 'react'
import { X } from 'lucide-react'
import { Textarea } from '@mantine/core'

import { type TCriticalAny } from '@core/types/type-any'

import { type ISTextAreaProps } from './resources'

const STextArea = forwardRef<HTMLInputElement, ISTextAreaProps>(
    ({ classNames, value, onChange, withRightSection = true, disabled = false, ...rest }, ref) => {
        return (
            <Textarea
                ref={ref as TCriticalAny}
                classNames={{
                    wrapper: '!w-full',
                    input: ` ${classNames?.input ?? ''} !border-2 !border-gray-200 !rounded-lg !bg-gray-100 !py-2 !h-auto placeholder:!text-base !text-base focus:!border-blue-tint-700 hover:!border-primary`
                }}
                rows={8}
                minRows={3}
                maxRows={7}
                rightSection={
                    withRightSection &&
                    !disabled && (
                        <X
                            onClick={() => onChange && onChange('')}
                            style={{ display: value ? undefined : 'none' }}
                            size='20'
                            color='gray'
                            className='pointer-events-auto cursor-pointer'
                        />
                    )
                }
                disabled={disabled}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                {...rest}
            />
        )
    }
)

STextArea.displayName = 'STextArea'

export default STextArea

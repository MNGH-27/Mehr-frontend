import { type FC } from 'react'
import { ErrorMessage } from '@hookform/error-message'

import { type ISInputFieldProps } from './resources'

const SInputField: FC<ISInputFieldProps> = ({
    children,
    className = '',
    label = '',
    labelClassName = '',
    labelDescription = '',
    description = '',
    errors,
    name,
    required = false
}) => {
    return (
        <div className={`flex flex-col gap-y-2 w-full ` + className}>
            <div className={`flex grow flex-col gap-y-1`}>
                <span
                    dir='ltr'
                    className={`text-base md:text-lg !text-gray-500 text-right flex items-center justify-end gap-x-1 ${labelClassName}`}
                >
                    {required && <span className='text-error'>*</span>}
                    {label}
                </span>
                {labelDescription && (
                    <p className='text-gray-700 text-right w-full font-medium text-sm'>{labelDescription}</p>
                )}
                {children}
            </div>

            {errors[name] ? (
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => <span className='text-sm font-medium text-error'>{message}</span>}
                />
            ) : (
                description && <span className='text-gray-700 text-right w-full text-sm'>{description}</span>
            )}
        </div>
    )
}

export default SInputField

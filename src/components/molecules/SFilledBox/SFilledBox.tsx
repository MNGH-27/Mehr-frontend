import React, { type FC } from 'react'

import { type ISFilledBoxProps } from './resources'

const SFilledBox: FC<ISFilledBoxProps> = ({ children, variant, isFill = false, disabled = false, ...rest }) => {
    const generateStyle = () => {
        if (disabled) {
            return {
                border: 'border-gray-400 cursor-not-allowed',
                bg: 'bg-gray-400'
            }
        }

        switch (variant) {
            case 'PRIMARY':
                return {
                    border: 'border-primary-tinted-700 ',
                    bg: 'bg-primary-tinted-700'
                }
            case 'ERROR':
                return {
                    border: 'border-error',
                    bg: 'bg-error'
                }
            case 'SUCCESS':
                return {
                    border: 'border-success',
                    bg: 'bg-success'
                }
            case 'SECONDARY':
                return {
                    border: 'border-secondary-700',
                    bg: 'bg-secondary-700'
                }
            default:
                return {
                    border: '',
                    bg: ''
                }
        }
    }

    return (
        <div
            className={`${generateStyle().border} relative group flex items-center justify-center flex-col border p-5 font-medium w-fit rounded-md cursor-pointer`}
            {...rest}
        >
            <div className='relative z-10'>{children}</div>
            <div
                className={`${generateStyle().bg} w-full ${isFill ? 'h-full' : 'h-1/6'} absolute bottom-0 rounded-b-md group-hover:h-full group-hover:rounded-t-md duration-300`}
            ></div>
        </div>
    )
}

export default SFilledBox

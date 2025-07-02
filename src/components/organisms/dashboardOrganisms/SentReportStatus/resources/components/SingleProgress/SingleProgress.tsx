import React, { type FC, useCallback } from 'react'

import { SProgress } from '@atoms/SProgress'

const SingleProgress: FC<{ title: string; progress: number; color: 'secondary' | 'success' | 'primary' }> = ({
    title,
    progress,
    color
}) => {
    const generatedColor = useCallback(() => {
        if (color === 'primary') {
            return {
                text: 'text-primary-tinted-600',
                bg: '!bg-primary-tinted-600'
            }
        } else if (color === 'secondary') {
            return {
                text: 'text-secondary-900',
                bg: '!bg-secondary-900'
            }
        } else {
            return {
                text: 'text-success-light',
                bg: '!bg-success-light'
            }
        }
    }, [color])

    return (
        <div className='space-y-1'>
            <div className='flex items-center justify-between font-medium'>
                <span>{title}</span>
                <span className={`text-xs ${generatedColor().text}`}>{progress}%</span>
            </div>
            <SProgress
                value={progress}
                classNames={{
                    section: `${generatedColor().bg}`
                }}
            />
        </div>
    )
}

export default SingleProgress

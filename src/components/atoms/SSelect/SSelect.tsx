import { forwardRef } from 'react'
import { Select } from '@mantine/core'

import { LoadingBoundary } from '@partials/boundaries/Loading'

import { type ISSelectProps } from './resources'

const SSelect = forwardRef<HTMLInputElement, ISSelectProps>(({ classNames, isLoading, ...rest }, ref) => {
    return (
        <Select
            ref={ref}
            className={` ` + classNames}
            classNames={{
                root: 'w-full',
                input: `!border-2 !border-gray-200 !rounded-lg !bg-secondary-100 !py-2 !h-auto placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary ${classNames?.input ?? ''}`,
                dropdown: '!p-2',
                option: '!py-2 font-medium text-gray-800',
                section: '!pointer-event-none'
            }}
            withCheckIcon={false}
            clearable
            nothingFoundMessage={isLoading ? <LoadingBoundary /> : 'اطلاعاتی برای نمایش یافت نشد...'}
            {...rest}
        />
    )
})

SSelect.displayName = 'SSelect'

export default SSelect

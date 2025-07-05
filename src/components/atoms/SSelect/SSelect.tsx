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
                input: `!border !border-gray-200 !rounded-lg !py-2 md:!py-3 !h-auto placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary ${classNames?.input ?? ''}`,
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

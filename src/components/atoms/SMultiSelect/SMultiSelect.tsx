import { forwardRef } from 'react'
import { MultiSelect } from '@mantine/core'

import { LoadingBoundary } from '@partials/boundaries/Loading'

import { type ISMultiSelectProps } from './resources'

const SMultiSelect = forwardRef<HTMLInputElement, ISMultiSelectProps>(
    ({ classNames, isLoading, value = [], ...rest }, ref) => {
        return (
            <MultiSelect
                className={` ` + classNames}
                classNames={{
                    root: 'w-full',
                    input: '!border !border-gray-200 !rounded-lg !py-2 md:!py-3 !h-auto placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary',
                    dropdown: '!p-2',
                    option: '!py-2 font-medium text-gray-800 my-1 text-base'
                }}
                withCheckIcon={false}
                nothingFoundMessage={isLoading ? <LoadingBoundary /> : 'اطلاعاتی برای نمایش یافت نشد...'}
                ref={ref}
                value={!value || !Array.isArray(value) ? [] : value}
                {...rest}
            />
        )
    }
)

SMultiSelect.displayName = 'SMultiSelect'

export default SMultiSelect

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
                    input: '!h-auto !border-2 !border-gray-200 !rounded-lg !bg-gray-100 !py-2 !h-auto placeholder:!text-base !text-base focus:!border-blue-tint-700 hover:!border-primary',
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

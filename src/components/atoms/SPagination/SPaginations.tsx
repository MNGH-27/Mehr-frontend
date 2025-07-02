import { type FC } from 'react'
import { Pagination } from '@mantine/core'

import { type ISPaginationProps } from './resources'

const SPagination: FC<ISPaginationProps> = ({ className = '', ...rest }) => {
    return (
        <Pagination
            hideWithOnePage
            gap={0}
            classNames={{
                control: '!font-medium !border-[#D1D5DB] !text-[#6B7280] !rounded-none !border-l-0',
                dots: '!border-y !border-r !border-[#D1D5DB]'
            }}
            className={`mx-auto !w-fit ${className}`}
            {...rest}
        />
    )
}

export default SPagination

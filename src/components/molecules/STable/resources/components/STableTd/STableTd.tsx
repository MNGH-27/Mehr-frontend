import React, { type FC } from 'react'
import { Table, type TableTdProps } from '@mantine/core'

interface ISTableTdProps extends TableTdProps {
    hasBorder?: boolean
}

const STableTd: FC<ISTableTdProps> = ({ className = '', children, hasBorder = false, ...rest }) => {
    return (
        <Table.Td
            className={`${hasBorder ? '!border-x !border-b' : ''} !py-3.5 !px-3 text-secondary-900 !p-0 font-semibold text-center ${className}`}
            {...rest}
        >
            {children}
        </Table.Td>
    )
}

export default STableTd

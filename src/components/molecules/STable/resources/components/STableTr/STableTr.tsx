import React, { type FC } from 'react'
import { Table, type TableTrProps } from '@mantine/core'

interface ISTableTrProps extends TableTrProps {
    index: number
}

const STableTr: FC<ISTableTrProps> = ({ className = '', children, index, ...rest }) => {
    return (
        <Table.Tr className={`${index % 2 === 0 ? '' : 'bg-secondary-200'} ${className}`} {...rest}>
            {children}
        </Table.Tr>
    )
}

export default STableTr

'use client'

import React, { type FC } from 'react'
import { Table } from '@mantine/core'

import { type ISTableProps, STableTd, STableTr } from './resources'

const STable: FC<ISTableProps> & {
    Tr: typeof STableTr
    Td: typeof STableTd
} = ({ TABLE_HEAD, children, className = '', ...rest }) => {
    return (
        <div className='w-full h-full grid'>
            <div className='grid overflow-x-auto'>
                <Table
                    stripedColor={'#F9F9F9'}
                    striped='even'
                    withRowBorders={false}
                    className={`!border-0 whitespace-nowrap border-collapse ` + className}
                    {...rest}
                >
                    <Table.Thead className={``}>
                        <Table.Tr>
                            {TABLE_HEAD.map((head) => (
                                <Table.Th
                                    key={head.title}
                                    className={`!text-center text-sm font-semibold !py-2.5 border-b !border-secondary-500 text-secondary-800`}
                                >
                                    {head?.icon}
                                    <span>{head.title}</span>
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody className={`text-sm'`}>{children}</Table.Tbody>
                </Table>
            </div>
        </div>
    )
}

STable.Tr = STableTr
STable.Td = STableTd

export default STable

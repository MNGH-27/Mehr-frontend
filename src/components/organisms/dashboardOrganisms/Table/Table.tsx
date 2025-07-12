'use client'

import { type FC } from 'react'

import { STable } from '@molecules/STable'

import { type IDashboardTableProps, TABLE_HEAD } from './resources'

const DashboardTable: FC<IDashboardTableProps> = ({ data, selectedReport, setSelectedReport }) => {
    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td
                            className={`${data.reportItemId === selectedReport?.reportItemId ? '!text-primary' : ''} cursor-pointer`}
                            onClick={() => setSelectedReport(data)}
                        >
                            {data.title}{' '}
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </>
    )
}

export default DashboardTable

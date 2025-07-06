'use client'

import { type FC } from 'react'

import { STable } from '@molecules/STable'

import { type IDetailReportTableProps, TABLE_HEAD } from './resources'

const DetailReportTable: FC<IDetailReportTableProps> = ({ data }) => {
    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.reportItemName} </STable.Td>
                        <STable.Td>{data.stateName}</STable.Td>
                        <STable.Td>{data.sum}</STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </>
    )
}

export default DetailReportTable

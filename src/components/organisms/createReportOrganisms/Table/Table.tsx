'use client'

import { type FC } from 'react'

import { STable } from '@molecules/STable'

import { type ICreateReportTableProps, TABLE_HEAD } from './resources'

const CreateReportTable: FC<ICreateReportTableProps> = ({ data }) => {
    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.title} </STable.Td>
                        <STable.Td>{data.description}</STable.Td>
                        <STable.Td>{data.reportTypeTitle}</STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </>
    )
}

export default CreateReportTable

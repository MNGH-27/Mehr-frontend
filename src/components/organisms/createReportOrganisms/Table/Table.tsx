'use client'

import { type FC } from 'react'
import Link from 'next/link'
import { Notebook } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'

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
                        <STable.Td>
                            <div className='flex items-center justify-center'>
                                <SButton
                                    component={Link}
                                    href={Routes.CreateReportDetail(data.reportItemId)}
                                    variant='TextPrimary'
                                    size='None'
                                >
                                    جزئیات گزارش
                                    <Notebook />
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </>
    )
}

export default CreateReportTable

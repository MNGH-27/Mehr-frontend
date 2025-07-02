'use client'

import { type FC } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'

import { type IMyCompaniesTableProps, TABLE_HEAD } from './resources'

const MyCompaniesTable: FC<IMyCompaniesTableProps> = ({ data }) => {
    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.companyName} </STable.Td>
                        <STable.Td>{moment(data.fiscalYear).format('jYYYY/jMM/jDD')}</STable.Td>
                        <STable.Td>{data.companyTypes.length !== 0 ? data.companyTypes[0].name : '-'}</STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-2'>
                                <SButton
                                    component={Link}
                                    href={Routes.MyCompaniesSingleCompany(data.companyId)}
                                    size='None'
                                    variant='TextSuccess'
                                >
                                    مشاهده
                                    <Eye size={20} />
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </>
    )
}

export default MyCompaniesTable

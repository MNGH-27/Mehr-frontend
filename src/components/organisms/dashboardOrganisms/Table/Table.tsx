'use client'

import { type FC, useEffect, useState } from 'react'

import { STable } from '@molecules/STable'

import { type TCriticalAny } from '@core/types/type-any'

import { type IDashboardTableProps } from './resources'

const DashboardTable: FC<IDashboardTableProps> = ({ data }) => {
    const [tableData, setTableData] = useState<
        { title: string; value: number; stateName?: string; regionName?: string }[]
    >([])
    const [tableHeader, setTableHeader] = useState([])

    useEffect(() => {
        convertDataHandler()
    }, [data])

    const convertDataHandler = () => {
        const convertedData: TCriticalAny = []
        const tableHeaderTemp = [
            {
                id: 0,
                title: 'ردیف'
            },
            {
                id: 1,
                title: 'نوع گزارش'
            }
        ]
        if (data?.reportDataTables && data?.reportDataTables.length > 0 && data?.reportDataTables[0].stateId)
            tableHeaderTemp.push({ id: 2, title: 'نام استان' })
        if (data?.reportDataTables && data?.reportDataTables.length > 0 && data?.reportDataTables[0].regionId)
            tableHeaderTemp.push({ id: 3, title: 'نام منطقه' })
        tableHeaderTemp.push({ id: 4, title: 'عملیات' })
        data?.reportDataTables?.forEach((singleReport) => {
            const tempReport: TCriticalAny = {}

            tempReport.title = singleReport.reportItemName
            tempReport.value = singleReport.answerValue
            if (singleReport.stateId) tempReport.stateName = singleReport.stateName ?? ''
            if (singleReport.regionId) tempReport.regionName = singleReport.regionName ?? ''
            convertedData.push(tempReport)
        })

        setTableData(convertedData as TCriticalAny)
        setTableHeader(tableHeaderTemp as TCriticalAny)
    }

    return (
        <>
            <STable TABLE_HEAD={tableHeader}>
                {tableData?.map((item, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{item.title} </STable.Td>
                        {item.stateName && <STable.Td>{item.stateName} </STable.Td>}
                        {item.regionName && <STable.Td>{item.regionName} </STable.Td>}
                        <STable.Td>{item.value} </STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </>
    )
}

export default DashboardTable

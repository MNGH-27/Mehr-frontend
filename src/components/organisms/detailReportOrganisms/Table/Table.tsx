'use client'

import { type FC } from 'react'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { SAreaChart } from '@molecules/SAreaChart'
import { SBasicBarChart } from '@molecules/SBasicBarChart'
import { SBasicColumnChart } from '@molecules/SBasicColumnChart'
import { SDonutChart } from '@molecules/SDonutChart'
import { SLineChart } from '@molecules/SLineChart'
import { SPieChart } from '@molecules/SPieChart'

import { type TReportChartItemType } from '@core/types/api/report.type'

interface IDetailReportTableProps {
    data?: TReportChartItemType[]
}

const DetailReportTable: FC<IDetailReportTableProps> = ({ data }) => {
    const [chartType] = useQueryParam('chart-type', NumberParam)
    const [chartName] = useQueryParam('chart-name', StringParam)

    if (chartType === 1) return <SBasicBarChart data={data} chartName={chartName ?? ''} />
    else if (chartType === 2) return <SLineChart data={data} chartName={chartName ?? ''} />
    else if (chartType === 3) return <SAreaChart data={data} chartName={chartName ?? ''} />
    else if (chartType === 4) return <SBasicColumnChart data={data} chartName={chartName ?? ''} />
    else if (chartType === 5) return <SPieChart data={data} chartName={chartName ?? ''} />
    else return <SDonutChart data={data} chartName={chartName ?? ''} />
}


export default DetailReportTable

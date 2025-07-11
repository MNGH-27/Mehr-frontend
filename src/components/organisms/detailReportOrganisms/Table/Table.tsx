'use client'

import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { SBasicBarChart } from '@molecules/SBasicBarChart'

const DetailReportTable = () => {
    const [] = useQueryParam('chart-type', NumberParam)
    const [chartName] = useQueryParam('chart-name', StringParam)

    return (
        <>
            <SBasicBarChart chartName={chartName ?? ''} />
        </>
    )
}

export default DetailReportTable

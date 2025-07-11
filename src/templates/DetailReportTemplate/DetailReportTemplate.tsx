'use client'

import { useParams } from 'next/navigation'
import { StringParam, useQueryParams } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import {
    DetailReportFilter,
    DetailReportFooter,
    DetailReportHeader,
    DetailReportTable
} from '@organisms/detailReportOrganisms'

import { useGetReportChart } from '@core/services/hooks/report/useGetReportChart'

const DetailReportTemplate = () => {
    const { reportId } = useParams<{ reportId: string }>()

    const [query] = useQueryParams({
        name: StringParam,
        stateId: StringParam,
        regionId: StringParam
    })

    const {
        data: allReportCharts,
        isLoading: isLoadingAllReportCharts,
        isError: isErrorAllReportCharts
    } = useGetReportChart({
        RegionId: query.regionId,
        StateId: query.stateId,
        ReportItemId: reportId,
        ReportLevel: query.stateId && query.regionId ? '3' : query.stateId ? '2' : '1'
    })

    return (
        <div className='space-y-5'>
            <DetailReportHeader />

            <DetailReportFilter />
            <FetchingBoundary
                isError={isErrorAllReportCharts}
                isLoading={isLoadingAllReportCharts}
                length={allReportCharts?.data.length}
            >
                <DetailReportTable />
            </FetchingBoundary>
            <DetailReportFooter />
        </div>
    )
}

export default DetailReportTemplate

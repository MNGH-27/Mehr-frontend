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
        reportLevel: StringParam,
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
        ReportLevel: query.reportLevel
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
                <DetailReportTable data={allReportCharts?.data} />
            </FetchingBoundary>
            <DetailReportFooter />
        </div>
    )
}

export default DetailReportTemplate

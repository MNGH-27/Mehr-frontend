'use client'

import { NumberParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { FillReportFilter, FillReportTable } from '@organisms/fillReportOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetReportData } from '@core/services/hooks/report/useGetReportData'

const FillReportTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [ReportItemId] = useQueryParam('ReportItemId', NumberParam)

    const {
        data: allReports,
        isLoading: isLoadingAllReports,
        isError: isErrorAllReports
    } = useGetReportData({ pageNumber: page ?? 1, pageSize: 10, ReportItemId })

    return (
        <div className='space-y-5'>
            <FillReportFilter />
            <FetchingBoundary
                isError={isErrorAllReports}
                isLoading={isLoadingAllReports}
                length={allReports?.data.data.length}
            >
                <FillReportTable data={allReports?.data.data} />
                <SPagination total={allReports?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
        </div>
    )
}

export default FillReportTemplate

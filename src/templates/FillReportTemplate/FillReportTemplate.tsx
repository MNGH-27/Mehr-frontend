'use client'

import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'
import { NotFoundBoundary } from '@partials/boundaries/NotFound'

import { FillReportFilter, FillReportTable } from '@organisms/fillReportOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetReportData } from '@core/services/hooks/report/useGetReportData'

const FillReportTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [ReportItemId] = useQueryParam('ReportItemId', NumberParam)
    const [StateId] = useQueryParam('stateId', StringParam)
    const [RegionId] = useQueryParam('regionId', StringParam)
    const {
        data: allReports,
        isLoading: isLoadingAllReports,
        isError: isErrorAllReports
    } = useGetReportData({ pageNumber: page ?? 1, pageSize: 10, ReportType: ReportItemId, RegionId, StateId })

    return (
        <div className='space-y-5'>
            <FillReportFilter />
            {ReportItemId ? (
                <FetchingBoundary
                    isError={isErrorAllReports}
                    isLoading={isLoadingAllReports}
                    length={allReports?.data.data.length}
                >
                    <FillReportTable data={allReports?.data.data} />
                    <SPagination
                        total={allReports?.data?.metaData?.totalPage ?? 0}
                        value={page ?? 1}
                        onChange={setPage}
                    />
                </FetchingBoundary>
            ) : (
                <NotFoundBoundary text='ابتدا نوع گزارش را انتخاب کنید' />
            )}
        </div>
    )
}

export default FillReportTemplate

'use client'
import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'
import { NotFoundBoundary } from '@partials/boundaries/NotFound'

import { DashboardFilter, DashboardTable } from '@organisms/dashboardOrganisms'

import { useGetReportTable } from '@core/services/hooks/report/useGetReportTable'

const DashboardTemplate = () => {
    const [ReportItemId] = useQueryParam('ReportItemId', NumberParam)
    const [StateId] = useQueryParam('stateId', StringParam)
    const [RegionId] = useQueryParam('regionId', StringParam)
    const {
        data: allReports,
        isLoading: isLoadingAllReports,
        isError: isErrorAllReports
    } = useGetReportTable({ ReportType: ReportItemId, RegionId, StateId })

    return (
        <div className='space-y-5'>
            <DashboardFilter />
            {ReportItemId ? (
                <FetchingBoundary
                    isError={isErrorAllReports}
                    isLoading={isLoadingAllReports}
                    length={allReports?.data.reportDataTables.length}
                >
                    <DashboardTable data={allReports?.data} />
                </FetchingBoundary>
            ) : (
                <NotFoundBoundary text='ابتدا نوع گزارش را انتخاب کنید' />
            )}
        </div>
    )
}

export default DashboardTemplate

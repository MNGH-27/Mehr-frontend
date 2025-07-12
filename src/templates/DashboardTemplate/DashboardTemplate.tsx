'use client'

import { useState } from 'react'
import { NumberParam, useQueryParam } from 'use-query-params'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { FetchingBoundary } from '@partials/boundaries/Fetching'
import { LoadingBoundary } from '@partials/boundaries/Loading'
import { NotFoundBoundary } from '@partials/boundaries/NotFound'

import { DashboardTable } from '@organisms/dashboardOrganisms'

import { SBasicColumnChart } from '@molecules/SBasicColumnChart'
import { SLineChart } from '@molecules/SLineChart'
import { SPieChart } from '@molecules/SPieChart'

import { SPagination } from '@atoms/SPagination'

import { useGetReportChart } from '@core/services/hooks/report/useGetReportChart'
import { useGetReportItems } from '@core/services/hooks/report/useGetReportItems'
import { type TReportItemType } from '@core/types/api/report.type'

const DashboardTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [selectedReport, setSelectedReport] = useState<TReportItemType>()

    const {
        data: allReports,
        isLoading: isLoadingAllReports,
        isError: isErrorAllReports
    } = useGetReportItems({ pageNumber: page ?? 1, pageSize: 10 })

    const {
        data: allReportCharts,
        isLoading: isLoadingAllReportCharts,
        isError: isErrorAllReportCharts
    } = useGetReportChart({
        ReportItemId: selectedReport?.reportItemId
    })

    return (
        <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-4 flex flex-col w-full gap-y-5 border rounded-lg'>
                <FetchingBoundary
                    isError={isErrorAllReports}
                    isLoading={isLoadingAllReports}
                    length={allReports?.data.data.length}
                >
                    <DashboardTable
                        selectedReport={selectedReport}
                        setSelectedReport={setSelectedReport}
                        data={allReports?.data.data}
                    />
                    <SPagination
                        total={allReports?.data?.metaData?.totalPage ?? 0}
                        value={page ?? 1}
                        onChange={setPage}
                    />
                </FetchingBoundary>
            </div>
            <div className='grid col-span-8 border rounded-lg p-2'>
                {!selectedReport ? (
                    <NotFoundBoundary text='ابتدا از جدول گزارش را مشخص کنید' />
                ) : isLoadingAllReportCharts ? (
                    <LoadingBoundary />
                ) : isErrorAllReportCharts ? (
                    <ErrorBoundary />
                ) : (
                    <SPieChart chartName={selectedReport?.title ?? ''} data={allReportCharts?.data} />
                )}
            </div>

            <div className='grid col-span-6 border rounded-lg p-2'>
                {!selectedReport ? (
                    <NotFoundBoundary text='ابتدا از جدول گزارش را مشخص کنید' />
                ) : isLoadingAllReportCharts ? (
                    <LoadingBoundary />
                ) : isErrorAllReportCharts ? (
                    <ErrorBoundary />
                ) : (
                    <SLineChart chartName={selectedReport?.title ?? ''} data={allReportCharts?.data} />
                )}
            </div>
            <div className='grid col-span-6 border rounded-lg p-2'>
                {!selectedReport ? (
                    <NotFoundBoundary text='ابتدا از جدول گزارش را مشخص کنید' />
                ) : isLoadingAllReportCharts ? (
                    <LoadingBoundary />
                ) : isErrorAllReportCharts ? (
                    <ErrorBoundary />
                ) : (
                    <SBasicColumnChart chartName={selectedReport?.title ?? ''} data={allReportCharts?.data} />
                )}
            </div>
        </div>
    )
}

export default DashboardTemplate

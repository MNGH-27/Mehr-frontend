'use client'

import { useParams } from 'next/navigation'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { FillReportFilter, FillReportTable } from '@organisms/fillReportOrganisms'

import { useGetReportOfProvince } from '@core/services/hooks/report/useGetReportOfProvince'

const FillReportFormTemplate = () => {
    const { reportId } = useParams<{ reportId: string }>()
    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetReportOfProvince({
        ReportItemId: reportId
    })

    return (
        <div className='space-y-5'>
            <FillReportFilter />
            <FetchingBoundary isError={isErrorAllOrgans} isLoading={isLoadingAllOrgans} length={allOrgans?.data.length}>
                <FillReportTable data={allOrgans?.data} />
            </FetchingBoundary>
        </div>
    )
}

export default FillReportFormTemplate

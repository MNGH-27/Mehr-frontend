'use client'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { FillReportFilter, FillReportTable } from '@organisms/fillReportOrganisms'

import { useGetReportItemsByRegionId } from '@core/services/hooks/report/useGetReportItemsByRegionId'

const FillReportTemplate = () => {
    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetReportItemsByRegionId({})

    return (
        <div className='space-y-5'>
            <FillReportFilter />
            <FetchingBoundary isError={isErrorAllOrgans} isLoading={isLoadingAllOrgans} length={allOrgans?.data.length}>
                <FillReportTable data={allOrgans?.data} />
            </FetchingBoundary>
        </div>
    )
}

export default FillReportTemplate

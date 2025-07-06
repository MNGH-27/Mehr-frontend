'use client'

import { StringParam, useQueryParams } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { CreateReportFilter, CreateReportTable } from '@organisms/createReportOrganisms'

import { useGetReportItemsByRegionId } from '@core/services/hooks/report/useGetReportItemsByRegionId'

const CreateReportTemplate = () => {
    const [query] = useQueryParams({
        name: StringParam,
        stateId: StringParam,
        regionId: StringParam
    })

    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetReportItemsByRegionId({
        RegionId: query.regionId,
        StateId: query.stateId
    })

    return (
        <div className='space-y-5'>
            <CreateReportFilter />
            <FetchingBoundary isError={isErrorAllOrgans} isLoading={isLoadingAllOrgans} length={allOrgans?.data.length}>
                <CreateReportTable data={allOrgans?.data} />
            </FetchingBoundary>
        </div>
    )
}

export default CreateReportTemplate

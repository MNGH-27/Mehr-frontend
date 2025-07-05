'use client'

import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { ManageOrganTypeFilter, ManageOrganTypeTable } from '@organisms/manageOrganTypesOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetAllOrganType } from '@core/services/hooks/organ/useGetAllOrganType'

const ManageOrganTypesTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [Name] = useQueryParam('name', StringParam)

    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetAllOrganType({
        pageNumber: page ?? 1,
        pageSize: 10,
        Name
    })

    return (
        <div className='space-y-5'>
            <ManageOrganTypeFilter />
            <FetchingBoundary
                isError={isErrorAllOrgans}
                isLoading={isLoadingAllOrgans}
                length={allOrgans?.data.data.length}
            >
                <ManageOrganTypeTable data={allOrgans?.data.data} />
                <SPagination total={allOrgans?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
        </div>
    )
}

export default ManageOrganTypesTemplate

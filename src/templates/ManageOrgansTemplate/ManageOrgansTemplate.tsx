'use client'

import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { ManageOrgansFilter, ManageOrgansTable } from '@organisms/manageOrgansOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetAllOrgan } from '@core/services/hooks/organ/useGetAllOrgan'

const ManageOrgansTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [Name] = useQueryParam('name', StringParam)

    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetAllOrgan({
        pageNumber: page ?? 1,
        pageSize: 10,
        Name
    })

    return (
        <div className='space-y-5'>
            <ManageOrgansFilter />
            <FetchingBoundary
                isError={isErrorAllOrgans}
                isLoading={isLoadingAllOrgans}
                length={allOrgans?.data.data.length}
            >
                <ManageOrgansTable data={allOrgans?.data.data} />
                <SPagination total={allOrgans?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
        </div>
    )
}

export default ManageOrgansTemplate

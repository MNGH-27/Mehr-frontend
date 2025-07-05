'use client'

import { NumberParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { ManageRoleFilter, ManageRoleTable } from '@organisms/manageRoleOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetAllRole } from '@core/services/hooks/role/useGetAllRole'

const ManageRoleTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)

    const {
        data: allRoles,
        isLoading: isLoadingAllRoles,
        isError: isErrorAllRoles
    } = useGetAllRole({
        pageNumber: page ?? 1,
        pageSize: 10
    })

    return (
        <div className='space-y-5'>
            <ManageRoleFilter />
            <FetchingBoundary
                isError={isErrorAllRoles}
                isLoading={isLoadingAllRoles}
                length={allRoles?.data.data.length}
            >
                <ManageRoleTable data={allRoles?.data.data} />
                <SPagination total={allRoles?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
        </div>
    )
}

export default ManageRoleTemplate

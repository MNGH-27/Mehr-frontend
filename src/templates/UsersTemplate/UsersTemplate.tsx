'use client'

import { NumberParam, StringParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { UsersFilter, UsersTable } from '@organisms/usersOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetAllUser } from '@core/services/hooks/user/useGetAllUser'

const UsersTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [NatId] = useQueryParam('NatId', StringParam)

    const {
        data: allUsers,
        isLoading: isLoadingAllUsers,
        isError: isErrorAllUsers
    } = useGetAllUser({
        pageNumber: page ?? 1,
        pageSize: 10,
        NatId
    })

    return (
        <div className='space-y-5'>
            <UsersFilter />
            <FetchingBoundary
                isError={isErrorAllUsers}
                isLoading={isLoadingAllUsers}
                length={allUsers?.data.data.length}
            >
                <UsersTable data={allUsers?.data.data} />
                <SPagination total={allUsers?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
        </div>
    )
}

export default UsersTemplate

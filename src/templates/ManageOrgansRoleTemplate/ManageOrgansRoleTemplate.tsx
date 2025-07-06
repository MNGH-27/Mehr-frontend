'use client'

import { useParams } from 'next/navigation'
import { NumberParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import {
    ManageOrgansRoleFilter,
    ManageOrgansRoleFooter,
    ManageOrgansRoleHeader,
    ManageOrgansRoleTable
} from '@organisms/manageOrgansRoleOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetAllUserInOrgan } from '@core/services/hooks/user/useGetAllUserInOrgan'

const ManageOrgansRoleTemplate = () => {
    const { organId } = useParams<{ organId: string }>()
    const [page, setPage] = useQueryParam('page', NumberParam)

    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetAllUserInOrgan({ OrganId: organId, pageNumber: page ?? 1, pageSize: 10 })

    return (
        <div className='space-y-5'>
            <ManageOrgansRoleHeader />
            <ManageOrgansRoleFilter />
            <FetchingBoundary
                isError={isErrorAllOrgans}
                isLoading={isLoadingAllOrgans}
                length={allOrgans?.data?.data.length}
            >
                <ManageOrgansRoleTable data={allOrgans?.data.data} />
                <SPagination total={allOrgans?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
            <ManageOrgansRoleFooter />
        </div>
    )
}

export default ManageOrgansRoleTemplate

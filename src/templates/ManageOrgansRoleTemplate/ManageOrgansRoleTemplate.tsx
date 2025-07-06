'use client'

import { useParams } from 'next/navigation'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import {
    ManageOrgansRoleFilter,
    ManageOrgansRoleFooter,
    ManageOrgansRoleHeader,
    ManageOrgansRoleTable
} from '@organisms/manageOrgansRoleOrganisms'

import useGetAllRoleInOrgan from '@core/services/hooks/organ/useGetAllRoleInOrgan/useGetAllRoleInOrgan.hooks'

const ManageOrgansRoleTemplate = () => {
    const { organId } = useParams<{ organId: string }>()

    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetAllRoleInOrgan({ OrganId: organId })

    return (
        <div className='space-y-5'>
            <ManageOrgansRoleHeader />
            <ManageOrgansRoleFilter />
            <FetchingBoundary isError={isErrorAllOrgans} isLoading={isLoadingAllOrgans} length={allOrgans?.data}>
                <ManageOrgansRoleTable data={allOrgans?.data} />
            </FetchingBoundary>
            <ManageOrgansRoleFooter />
        </div>
    )
}

export default ManageOrgansRoleTemplate

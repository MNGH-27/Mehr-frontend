'use client'


import { NumberParam, useQueryParam } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { CreateReportFilter, CreateReportTable } from '@organisms/createReportOrganisms'

import { SPagination } from '@atoms/SPagination'

import { useGetReportItems } from '@core/services/hooks/report/useGetReportItems'

const CreateReportTemplate = () => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    const [Title] = useQueryParam('name', NumberParam)
    const [Type] = useQueryParam('type', NumberParam)

    const {
        data: allReports,
        isLoading: isLoadingAllReports,
        isError: isErrorAllReports
    } = useGetReportItems({ pageNumber: page ?? 1, pageSize: 10, Title, Type })

    return (
        <div className='space-y-5'>
            <CreateReportFilter />
            <FetchingBoundary
                isError={isErrorAllReports}
                isLoading={isLoadingAllReports}
                length={allReports?.data.data.length}
            >
                <CreateReportTable data={allReports?.data.data} />
                <SPagination total={allReports?.data?.metaData?.totalPage ?? 0} value={page ?? 1} onChange={setPage} />
            </FetchingBoundary>
        </div>
    )
}

export default CreateReportTemplate

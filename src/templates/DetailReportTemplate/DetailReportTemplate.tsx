'use client'

import { useParams } from 'next/navigation'
import { StringParam, useQueryParams } from 'use-query-params'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import {
    DetailReportFilter,
    DetailReportFooter,
    DetailReportHeader,
    DetailReportTable
} from '@organisms/detailReportOrganisms'

import { useGetReportOfProvince } from '@core/services/hooks/report/useGetReportOfProvince'

const DetailReportTemplate = () => {
    const { reportId } = useParams<{ reportId: string }>()

    const [query] = useQueryParams({
        name: StringParam,
        stateId: StringParam,
        regionId: StringParam
    })

    const {
        data: allOrgans,
        isLoading: isLoadingAllOrgans,
        isError: isErrorAllOrgans
    } = useGetReportOfProvince({
        RegionId: query.regionId,
        StateId: query.stateId,
        ReportItemId: reportId
    })

    return (
        <div className='space-y-5'>
            <DetailReportHeader />
            <DetailReportFilter />
            <FetchingBoundary isError={isErrorAllOrgans} isLoading={isLoadingAllOrgans} length={allOrgans?.data.length}>
                <DetailReportTable data={allOrgans?.data} />
            </FetchingBoundary>
            <DetailReportFooter />
        </div>
    )
}

export default DetailReportTemplate

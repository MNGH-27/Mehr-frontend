'use client'

import { ArrowUp, Building2, Calendar, Layers, MapPin } from 'lucide-react'
import moment from 'moment-jalaali'
import { StringParam, useQueryParam } from 'use-query-params'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { LoadingBoundary } from '@partials/boundaries/Loading'

import { SMainContainer } from '@molecules/SMainContainer'

import { SBadge } from '@atoms/SBadge'

import { useGetCompanyById } from '@core/services/hooks/company/useGetCompanyById'
import { useGetCountReportForCompany } from '@core/services/hooks/company/useGetCountReportForCompany'

const MyCompaniesSingleDetailCompany = () => {
    const [companyId] = useQueryParam('filter', StringParam)
    const {
        data: singleCompany,
        isLoading: isLoadingSingleCompany,
        isError: isErrorSingleCompany
    } = useGetCompanyById({
        Id: companyId !== null && companyId !== undefined ? +companyId : -1
    })
    const {
        data: countReport,
        isLoading: isLoadingCountReport,
        isError: isErrorCountReport
    } = useGetCountReportForCompany({})

    if (isLoadingCountReport || isLoadingSingleCompany) {
        return <LoadingBoundary />
    }

    if (isErrorCountReport || isErrorSingleCompany) {
        return <ErrorBoundary />
    }

    return (
        <SMainContainer title='جزئیات شرکت'>
            <div className='flex items-center justify-start gap-x-2 text-2xl text-secondary-800 font-semibold'>
                <Building2 className='size-8 shrink-0' />
                <span>{singleCompany?.data.companyName}</span>
            </div>

            <div className='flex items-center justify-start gap-x-5 gap-y-2 flex-wrap'>
                <div className='flex items-center justify-center gap-x-2 text-blue-700 font-medium'>
                    <Calendar />
                    {moment(singleCompany?.data.fiscalYear).format('jYYYY/jMM/jDD')}
                </div>
                <div className='flex items-center justify-center gap-x-2 text-primary font-medium'>
                    <MapPin />
                    {singleCompany?.data.isForeigner ? 'خارجی' : 'داخلی'}
                </div>
                <div className='flex items-center justify-center gap-x-2 text-secondary-700 font-medium'>
                    <Layers />
                    <div className='flex items-center justify-start gap-x-2 flex-wrap grow'>
                        {singleCompany?.data.companyTypes.map((item, index) => (
                            <SBadge color='gray' variant='light' key={index}>
                                {item.name}
                            </SBadge>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-start w-full gap-x-8 gap-y-5 flex-wrap'>
                <div className='flex flex-col gap-y-3 border border-dashed w-fit p-5 rounded-md'>
                    <div className='flex items-center justify-start gap-x-1'>
                        <ArrowUp className='size-8 text-success-light' />
                        <span className='font-bold text-2xl'>{countReport?.data.countReportWaiting}</span>
                    </div>
                    <span className='font-semibold text-secondary-700'>گزارش های در انتظار</span>
                </div>
                <div className='flex flex-col gap-y-3 border border-dashed w-fit p-5 rounded-md'>
                    <div className='flex items-center justify-start gap-x-1'>
                        <ArrowUp className='size-8 text-success-light' />
                        <span className='font-bold text-2xl'>{countReport?.data.countReportVerify}</span>
                    </div>
                    <span className='font-semibold text-secondary-700'>گزارش های تایید شده</span>
                </div>
                <div className='flex flex-col gap-y-3 border border-dashed w-fit p-5 rounded-md'>
                    <div className='flex items-center justify-start gap-x-1'>
                        <ArrowUp className='size-8 text-success-light' />
                        <span className='font-bold text-2xl'>{countReport?.data.countReportUnVerify}</span>
                    </div>
                    <span className='font-semibold text-secondary-700'>گزارش های رد شده</span>
                </div>
            </div>
        </SMainContainer>
    )
}

export default MyCompaniesSingleDetailCompany

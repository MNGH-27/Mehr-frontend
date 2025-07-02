'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StringParam, useQueryParam } from 'use-query-params'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { LoadingBoundary } from '@partials/boundaries/Loading'

import { SFilledBox } from '@molecules/SFilledBox'
import { SMainContainer } from '@molecules/SMainContainer'

import { Routes } from '@core/constants/routes'
import { useGetYearOfCompany } from '@core/services/hooks/company/useGetYearOfCompany'
import { useGetReportByUserId } from '@core/services/hooks/report/useGetReportByUserId'

const MyCompaniesSingleYearReportDetail = () => {
    const { push } = useRouter()

    const [companyId] = useQueryParam('filter', StringParam)

    const [selectedYear, setSelectedYear] = useState<number>()

    const {
        data: yearOfCompany,
        isLoading: isLoadingYearOfCompany,
        isError: isErrorYearOfCompany
    } = useGetYearOfCompany({
        CompanyId: companyId !== null && companyId !== undefined ? +companyId : -1
    })

    const { data: reportTypes, isLoading: isLoadingReportType, isError: isErrorReportType } = useGetReportByUserId({})

    if (isLoadingReportType || isLoadingYearOfCompany) {
        return <LoadingBoundary />
    }

    if (isErrorReportType || isErrorYearOfCompany) {
        return <ErrorBoundary />
    }

    return (
        <SMainContainer title='گزارشات شرکت'>
            <div className='flex flex-col items-start justify-start gap-y-5'>
                <span className='text-lg font-medium'>سال مورد نظر را انتخاب کنید</span>
                <div className='flex items-center justify-start gap-5 flex-wrap w-full'>
                    {yearOfCompany?.data.map((singleYear) => (
                        <SFilledBox
                            onClick={() => setSelectedYear(singleYear)}
                            isFill={singleYear === selectedYear}
                            variant='SECONDARY'
                            key={singleYear}
                        >
                            <span className='relative z-10'>سال</span>
                            <span className='relative z-10'>{singleYear}</span>
                        </SFilledBox>
                    ))}
                </div>
            </div>

            {selectedYear && (
                <>
                    <hr />
                    <div className='flex flex-col items-start justify-start gap-y-5'>
                        <span className='text-lg font-medium'>گزارش مورد نظر را انتخاب کنید</span>
                        <div className='flex items-center justify-start gap-5 flex-wrap w-full'>
                            {reportTypes?.data.map((singleReportType, index) => (
                                <SFilledBox
                                    onClick={() => {
                                        push(
                                            `${Routes.ReportsAllReports()}?RT=${singleReportType.reportType}&CTI=${companyId}`
                                        )
                                    }}
                                    key={index}
                                    variant='PRIMARY'
                                >
                                    <div className='flex flex-col items-center justify-center'>
                                        <span className='text-lg'>{singleReportType.reportName}</span>
                                        <span className='text-sm font-medium text-gray-800'>
                                            {singleReportType.descriptionStr}
                                        </span>
                                    </div>
                                </SFilledBox>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </SMainContainer>
    )
}

export default MyCompaniesSingleYearReportDetail

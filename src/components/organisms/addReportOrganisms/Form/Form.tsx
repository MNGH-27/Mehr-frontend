'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Download } from 'lucide-react'
import moment from 'moment-jalaali'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { SDropZone } from '@molecules/SDropZone'
import { SFilledBox } from '@molecules/SFilledBox'
import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SSelect } from '@atoms/SSelect'

import { Routes } from '@core/constants/routes'
import { QueryKeysEnum } from '@core/enums/query-keys'
import { getDocumentByIdQueryFn } from '@core/services/api/general/get-document-by-id'
import { postAddNewReportForCompanyMutationFn } from '@core/services/api/report/post-add-new-report-for-company'
import { useGetExceptionYears } from '@core/services/hooks/exception-rule/useGetExceptionYears'
import { useGetReportByUserId } from '@core/services/hooks/report/useGetReportByUserId'
import { type TReportByUserIdType } from '@core/types/api/report/report-by-user-id'
import { type TCriticalAny } from '@core/types/type-any'

import { MONTH_LIST } from './resources'

const AddReportForm = () => {
    // Current date and time
    const date = new Date()
    const currentYear = moment(date).format('jYYYY')

    const queryClient = useQueryClient()
    const { push } = useRouter()

    const [selectedReportType, setSelectedReportType] = useState<TReportByUserIdType>()
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [documentId, setDocumentId] = useState('')

    const { data: reportTypes, isLoading: isLoadingReportType, isError: isErrorReportType } = useGetReportByUserId({})
    const { data: exceptionYear, isLoading: isLoadingExceptionYear } = useGetExceptionYears({})

    const { mutate: download, isPending: isDownloading } = useMutation({
        mutationFn: getDocumentByIdQueryFn,
        onSuccess: (response: TCriticalAny) => {
            const link = document.createElement('a')
            link.href = `data:${response?.data.contentType};base64,${response?.data.base64File}`
            link.download = `${response?.data.alias}${response?.data.extension}` // Replace 'file-name.ext' with the desired filename and extension
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        onError: () => {
            toast.error('دریافت فایل با مشکل مواجه شد')
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postAddNewReportForCompanyMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'گزارش با موفقیت اضافه شد')

            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.CompanyReportByUserId]
            })

            push(Routes.ReportsAllReports())
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت گزارش با مشکل مواجه شد')
        }
    })

    return (
        <>
            <FetchingBoundary
                isError={isErrorReportType}
                isLoading={isLoadingReportType}
                length={reportTypes?.data.length}
            >
                <p className='font-semibold text-lg text-secondary-800'>انتخاب نوع گزارش</p>
                <div className='flex items-center justify-start gap-5 flex-wrap'>
                    {reportTypes?.data.map((singleReportType, index) => (
                        <SFilledBox
                            disabled={singleReportType.isSelected === false}
                            isFill={selectedReportType?.reportId === singleReportType.reportId}
                            onClick={() => {
                                if (singleReportType.isSelected) {
                                    setSelectedReportType(singleReportType)

                                    //clear previous data
                                    setMonth('')
                                    setYear('')
                                    setDocumentId('')
                                }
                            }}
                            key={index}
                            variant='PRIMARY'
                        >
                            <div className='flex flex-col items-center justify-center gap-y-2'>
                                <span className='text-lg'>{singleReportType.reportName}</span>
                                <span className='text-sm font-medium text-gray-800'>
                                    {singleReportType.descriptionStr}
                                </span>
                            </div>
                        </SFilledBox>
                    ))}
                </div>
            </FetchingBoundary>

            {selectedReportType && (
                <>
                    <hr />
                    <div className='flex flex-col items-start justify-start gap-y-5'>
                        <p className='font-semibold text-lg text-secondary-800'>
                            بارگذاری گزارش ({selectedReportType.reportName})
                        </p>
                        {selectedReportType.documentId && (
                            <div className='space-y-3 border rounded-lg p-3 border-secondary-500'>
                                <span className='font-medium text-secondary-900'>نمونه گذارش آپلود شده</span>
                                <SButton
                                    onClick={() =>
                                        download({
                                            Id: selectedReportType.documentId
                                        })
                                    }
                                    isLoading={isDownloading}
                                    variant='FilledPrimary'
                                    size='SM'
                                >
                                    دانلود نمونه
                                    <Download />
                                </SButton>
                            </div>
                        )}
                        <SInputField errors={{}} name='' label='سال گزارش'>
                            <SSelect
                                onChange={(value) => setYear(value ?? '')}
                                value={year}
                                data={exceptionYear?.data
                                    .map((item) => ({
                                        label: item.toString(),
                                        value: item.toString()
                                    }))
                                    .concat(
                                        exceptionYear.data.some((item) => +item === +currentYear)
                                            ? []
                                            : [
                                                  {
                                                      label: currentYear,
                                                      value: currentYear
                                                  }
                                              ]
                                    )}
                                isLoading={isLoadingExceptionYear}
                                placeholder='سال گزارش را انتخاب کنید'
                            />
                        </SInputField>
                        {selectedReportType.timePeriod === 1 && (
                            <SInputField errors={{}} name='' label='ماه گزارش'>
                                <SSelect
                                    onChange={(value) => setMonth(value ?? '')}
                                    value={month}
                                    data={MONTH_LIST}
                                    placeholder='ماه گزارش را انتخاب کنید'
                                />
                            </SInputField>
                        )}

                        <SInputField errors={{}} name='' label='فایل گزارش'>
                            <SDropZone
                                accept={`.${selectedReportType.titleDocumentFormat}`}
                                onChange={(id) => setDocumentId(id.toString())}
                                value={documentId}
                            />
                        </SInputField>

                        <SButton
                            onClick={() => {
                                if (documentId.trim().length === 0) {
                                    toast.error('لطفا فایل مورد نظر را آپلود کنید')
                                    return
                                }

                                mutate({
                                    documentId: documentId,
                                    reportId: selectedReportType.reportId,
                                    year: year ? +year : undefined,
                                    month: month ? +month : undefined
                                })
                            }}
                            isLoading={isPending}
                            size='M'
                            variant='FilledSecondary'
                        >
                            ثبت نهایی
                        </SButton>
                    </div>
                </>
            )}
        </>
    )
}

export default AddReportForm

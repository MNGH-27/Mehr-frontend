import { type FC, Fragment } from 'react'
import { toast } from 'react-toastify'
import { Download } from 'lucide-react'
import moment from 'moment-jalaali'
import { useMutation } from '@tanstack/react-query'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { SButton } from '@atoms/SButton'

import { MONTH_LIST } from '@core/constants/dummy-data'
import { getDocumentByIdQueryFn } from '@core/services/api/general/get-document-by-id'
import { useGetAllHistoryCompanyReport } from '@core/services/hooks/report/useGetAllHistoryCompanyReport'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDetailReportModalProps } from './resources'

const DetailReportModal: FC<IDetailReportModalProps> = ({ data }) => {
    const { mutate: download, isPending } = useMutation({
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

    const {
        data: companyReport,
        isLoading: isLoadingCompanyReport,
        isError: isErrorCompanyReport
    } = useGetAllHistoryCompanyReport({
        CompanyReportId: data?.companyReportId ?? -1,
        pageSize: 100,
        pageNumber: 1
    })

    return (
        <div className='grid md:grid-cols-2 gap-5'>
            <div className='flex items-center justify-start gap-1 flex-wrap'>
                <span className='text-secondary-800'>نام شرکت</span>
                <span className='text-primary font-medium'>{data?.companyName}</span>
            </div>
            {data?.dayLimitDateTime && (
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>تاریخ پایان مهلت آپلود</span>
                    <span className='text-primary font-medium'>
                        {moment(data?.dayLimitDateTime).format('jYYYY/jMM/jDD')}
                    </span>
                </div>
            )}

            <div className='flex items-center justify-start gap-1 flex-wrap'>
                <span className='text-secondary-800'>نام گزارش</span>
                <span className='text-primary font-medium'>{data?.reportName}</span>
            </div>
            <div className='flex items-center justify-start gap-1 flex-wrap'>
                <span className='text-secondary-800'>سال گزارش</span>
                <span className='text-primary font-medium'>{data?.timeYear}</span>
            </div>
            <div className='flex items-center justify-start gap-1 flex-wrap'>
                <span className='text-secondary-800'>عنوان نوع گزارش</span>
                <span className='text-primary font-medium'>{data?.titleReportType}</span>
            </div>
            {data?.year && (
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>سال گزارش شرکت</span>
                    <span className='text-primary font-medium'>{data?.year}</span>
                </div>
            )}

            {data?.month && data?.month !== 0 ? (
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>سال گزارش شرکت</span>
                    <span className='text-primary font-medium'>
                        {MONTH_LIST.find((item) => +item.value === data.month)?.label ?? '-'}
                    </span>
                </div>
            ) : (
                <></>
            )}

            {data?.documentId && (
                <>
                    <hr className='col-span-full' />
                    <div className='flex items-center justify-start gap-1 flex-wrap'>
                        <span className='text-secondary-800'>نوع فایل</span>
                        <span className='text-primary font-medium'>{data?.format}</span>
                    </div>
                    <div className='flex items-center justify-start gap-1 flex-wrap'>
                        <span className='text-secondary-800'>اخرین نسخه</span>
                        <span className='text-primary font-medium'>
                            <SButton
                                onClick={() =>
                                    download({
                                        Id: data.documentId ?? -1
                                    })
                                }
                                variant='FilledPrimary'
                                size='SM'
                                isLoading={isPending}
                            >
                                دانلود <Download />
                            </SButton>
                        </span>
                    </div>
                </>
            )}
            <hr className='col-span-full' />

            <div className='flex flex-col items-start justify-start w-full col-span-full'>
                <span className='text-lg font-semibold text-gray-800'>گردش کار گزارش</span>
                <FetchingBoundary
                    isError={isErrorCompanyReport}
                    isLoading={isLoadingCompanyReport}
                    length={companyReport?.data.data.length}
                >
                    {companyReport?.data.data.map((singleReport, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-y-2 ${index !== 0 ? 'border-t' : ''} w-full col-span-full py-2`}
                        >
                            <div className='flex items-center justify-start gap-1 flex-wrap'>
                                <span className='text-secondary-800'>وضعیت</span>
                                <span
                                    className={`${singleReport?.status === 1 ? 'text-green-700' : singleReport?.status === 2 ? 'text-red-700' : '!text-secondary-800'} font-medium`}
                                >
                                    {singleReport?.titleStatus}
                                </span>
                            </div>
                            <div className='w-full grid md:grid-cols-2 gap-5'>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>نام</span>
                                    <span className='text-primary font-medium'>{singleReport?.fullName}</span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>عنوان</span>
                                    <span className='text-primary font-medium'>{singleReport?.title}</span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>پیام</span>
                                    <span className='text-primary font-medium'>{singleReport.message}</span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>تاریخ ایجاد</span>
                                    <span className='text-primary font-medium'>
                                        {moment(singleReport.createAt).format('jYYYY/jMM/jDD')}
                                    </span>
                                </div>
                            </div>
                            {singleReport.documentId != null && (
                                <div className='flex items-start justify-start gap-1 flex-wrap flex-col w-full'>
                                    <span className='text-secondary-800'>فایل اپلود شده</span>
                                    <SButton
                                        onClick={() =>
                                            download({
                                                Id: singleReport.documentId ?? ''
                                            })
                                        }
                                        variant='FilledPrimary'
                                        size='SM'
                                        isLoading={isPending}
                                    >
                                        دانلود <Download />
                                    </SButton>
                                </div>
                            )}
                        </div>
                    ))}
                </FetchingBoundary>
            </div>
        </div>
    )
}

export default DetailReportModal

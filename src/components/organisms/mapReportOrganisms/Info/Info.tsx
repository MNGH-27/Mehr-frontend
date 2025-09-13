import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from 'lucide-react'

import { FetchingBoundary } from '@partials/boundaries/Fetching'
import { NotFoundBoundary } from '@partials/boundaries/NotFound'

import { useGetShakhesReport } from '@core/services/hooks/report/useGetShakhesReport'
import { type TShakhesReportItemType } from '@core/types/api/report.type'

interface MapReportCollapseProps {
    title: string
    children: React.ReactNode
}

const MapReportCollapse = ({ title, children }: MapReportCollapseProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className='flex w-full flex-col items-start justify-start gap-y-2 text-sm text-gray-700 border-b border-dashed pb-2'>
            <div
                className={`text-primary-shade-500 text-base font-semibold before:content-[""] before:w-3 before:h-3 before:bg-primary-tinted-900 before:rounded-full before:block before:mr-2 flex items-center justify-be gap-x-2 cursor-pointer w-full hover:bg-gray-100 transition-all select-none duration-300 rounded-md p-2 ${isOpen ? '!bg-primary-tinted-200' : ''} px-2`}
                onClick={handleOpen}
            >
                {title}
                <ChevronDownIcon className={`w-5 h-5 mr-auto duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className={`flex flex-wrap gap-x-2 gap-2 ${isOpen ? 'block' : 'hidden'}`}>{children}</div>
        </div>
    )
}

interface MapReportInfoBadgeProps {
    label: string
    value: string
}

const MapReportInfoBadge = ({ label, value }: MapReportInfoBadgeProps) => {
    return (
        <div className='flex items-start justify-start gap-x-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-default select-none hover:text-primary-tinted-700 px-2 py-1 rounded-md text-gray-700'>
            <span className='text-gray-900 font-semibold'>{label} : </span>
            <span>{value}</span>
        </div>
    )
}
interface MapReportInfoCardProps {
    title: string
    description: string
    image: string
    children: React.ReactNode
}

const MapReportInfoCard = ({ title, description, image, children }: MapReportInfoCardProps) => {
    return (
        <div className='flex flex-col items-start justify-start gap-y-4 w-full shadow-sm border-2 border-gray-200 rounded-md p-3'>
            <div className='flex items-center justify-center gap-x-4'>
                <Image src={image} alt='books' width={67} height={67} />
                <div className='flex items-start justify-between flex-col'>
                    <span className='text-lg font-bold text-primary-shade-500'>{title}</span>
                    <span className='text-sm text-gray-700'>{description}</span>
                </div>
            </div>
            {children}
        </div>
    )
}

interface MapReportInfoProps {
    selectedProvince: number | null
    data?: TShakhesReportItemType
}

const MapReportInfo = ({ data, selectedProvince }: MapReportInfoProps) => {
    const {
        data: shakhesReport,
        isLoading: isLoadingShakhesReport,
        isError: isErrorShakhesReport,
        isFetching: isFetchingShakhesReport
    } = useGetShakhesReport({
        StateId: selectedProvince
    })

    if (data == undefined) return <NotFoundBoundary className='!h-fit' text='داده ای برای نمایش یافت نشد' />

    return (
        <div>
            <div className='flex items-start justify-between flex-col mx-5 mb-10'>
                <span className='text-lg font-bold text-primary-shade-500'>شاخص‌های کلیدی نظام آموزشی</span>
                <span className='text-sm text-gray-700'>
                    این بخش نمایی کلی از مهم‌ترین شاخص‌های آموزشی کشور را ارائه می‌دهد. شاخص‌ها در پنج حوزه اصلی
                    دسته‌بندی شده‌اند تا مدیران بتوانند وضعیت موجود را ارزیابی کرده، روندها را مقایسه نموده و تصمیم‌های
                    مبتنی بر داده اتخاذ کنند.
                </span>
            </div>
            <FetchingBoundary
                isLoading={isLoadingShakhesReport || isFetchingShakhesReport}
                isError={isErrorShakhesReport}
            >
                <div className='grid 2xl:grid-cols-2 gap-4 w-full'>
                    <MapReportInfoCard
                        title='وضعیت کتب درسی'
                        description='شاخص‌های مربوط به تأمین و توزیع دانش‌آموزان به کتاب‌های درسی'
                        image='/images/books.png'
                    >
                        {shakhesReport?.data.bookReport.givenBooksQuantity && (
                            <MapReportCollapse title={shakhesReport?.data.bookReport.givenBooksQuantityTitle}>
                                {shakhesReport?.data.bookReport.givenBooksQuantity &&
                                    Object.entries(shakhesReport?.data.bookReport.givenBooksQuantity).map(
                                        ([key, value]) => (
                                            <MapReportInfoBadge key={key} label={key} value={value.toString()} />
                                        )
                                    )}
                            </MapReportCollapse>
                        )}
                    </MapReportInfoCard>

                    <MapReportInfoCard
                        title='فضای آموزشی'
                        description='شاخص‌های مرتبط با وضعیت فضا و امکانات آموزشی مدارس'
                        image='/images/school.png'
                    >
                        {shakhesReport?.data.educationStatusReport.numberOfSchools && (
                            <MapReportCollapse title={shakhesReport?.data.educationStatusReport.numberOfSchoolsTitle}>
                                {shakhesReport?.data.educationStatusReport.numberOfSchools &&
                                    Object.entries(shakhesReport?.data.educationStatusReport.numberOfSchools).map(
                                        ([key, value]) => (
                                            <MapReportInfoBadge key={key} label={key} value={value.toString()} />
                                        )
                                    )}
                            </MapReportCollapse>
                        )}
                        <MapReportCollapse title={'فضای ورزشی'}>
                            <MapReportInfoBadge
                                label={shakhesReport?.data.educationStatusReport.sportSpacesTitle || ''}
                                value={shakhesReport?.data.educationStatusReport.sportSpaces.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.educationStatusReport.sportSpacesAreaTitle || ''}
                                value={shakhesReport?.data.educationStatusReport.sportSpacesArea.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.educationStatusReport.workshopsNumberTitle || ''}
                                value={shakhesReport?.data.educationStatusReport.workshopsNumber.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.educationStatusReport.labsNumberTitle || ''}
                                value={shakhesReport?.data.educationStatusReport.labsNumber.toString() || ''}
                            />
                        </MapReportCollapse>
                    </MapReportInfoCard>
                    <MapReportInfoCard
                        title='وضعیت ثبت‌نام و کلاس‌بندی'
                        description='شاخص‌های مرتبط با تعداد و توزیع کلاس‌ها در پایه‌های مختلف تحصیلی'
                        image='/images/target.png'
                    >
                        {shakhesReport?.data.signAndClassification.classQuantity && (
                            <MapReportCollapse title={shakhesReport?.data.signAndClassification.classQuantityTitle}>
                                {shakhesReport?.data.signAndClassification.classQuantity &&
                                    Object.entries(shakhesReport?.data.signAndClassification.classQuantity).map(
                                        ([key, value]) => (
                                            <MapReportInfoBadge key={key} label={key} value={value.toString()} />
                                        )
                                    )}
                            </MapReportCollapse>
                        )}
                        {shakhesReport?.data.signAndClassification.regionDensity && (
                            <MapReportCollapse title={shakhesReport?.data.signAndClassification.regionDensityTitle}>
                                {shakhesReport?.data.signAndClassification.regionDensity &&
                                    Object.entries(shakhesReport?.data.signAndClassification.regionDensity).map(
                                        ([key, value]) => (
                                            <MapReportInfoBadge key={key} label={key} value={value.toString()} />
                                        )
                                    )}
                            </MapReportCollapse>
                        )}
                        {shakhesReport?.data.signAndClassification.signedUpQuantity && (
                            <MapReportCollapse title={shakhesReport?.data.signAndClassification.signedUpQuantityTitle}>
                                {shakhesReport?.data.signAndClassification.signedUpQuantity &&
                                    Object.entries(shakhesReport?.data.signAndClassification.signedUpQuantity).map(
                                        ([key, value]) => (
                                            <MapReportInfoBadge key={key} label={key} value={value.toString()} />
                                        )
                                    )}
                            </MapReportCollapse>
                        )}
                    </MapReportInfoCard>
                    <MapReportInfoCard
                        title='وضعیت نیروی انسانی'
                        description='شاخص‌های مربوط به تعداد و توزیع معلمان و کارکنان آموزشی'
                        image='/images/human-resources.png'
                    >
                        <MapReportCollapse title={shakhesReport?.data.staffReports.currentEmployeesQuantityTitle || ''}>
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.currentEmployeesQuantityTitle || ''}
                                value={shakhesReport?.data.staffReports.currentEmployeesQuantity.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.retiredEmployeesQuantityTitle || ''}
                                value={shakhesReport?.data.staffReports.retiredEmployeesQuantity.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.maternityLeaveQuantityTitle || ''}
                                value={shakhesReport?.data.staffReports.maternityLeaveQuantity.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.educationalLeaveQuantityTitle || ''}
                                value={shakhesReport?.data.staffReports.educationalLeaveQuantity.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.transferredEmployeesExitTitle || ''}
                                value={shakhesReport?.data.staffReports.transferredEmployeesExit.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.organEmployeesQuantityTitle || ''}
                                value={shakhesReport?.data.staffReports.organEmployeesQuantity.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.militaryEntrancesTitle || ''}
                                value={shakhesReport?.data.staffReports.militaryEntrances.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.ar28EntrancesTitle || ''}
                                value={shakhesReport?.data.staffReports.ar28Entrances.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.transferredEmployeesEntrancesTitle || ''}
                                value={shakhesReport?.data.staffReports.transferredEmployeesEntrances.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.convertedStatusEmployeesTitle || ''}
                                value={shakhesReport?.data.staffReports.convertedStatusEmployees.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffReports.farhangianEntrancesTitle || ''}
                                value={shakhesReport?.data.staffReports.farhangianEntrances.toString() || ''}
                            />
                        </MapReportCollapse>

                        <MapReportCollapse title={shakhesReport?.data.staffTrainingReport.coursesNumberTitle || ''}>
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffTrainingReport.coursesNumberTitle || ''}
                                value={shakhesReport?.data.staffTrainingReport.coursesNumber.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffTrainingReport.coursesHoursNumberTitle || ''}
                                value={shakhesReport?.data.staffTrainingReport.coursesHoursNumber.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffTrainingReport.coursesSignedUpTitle || ''}
                                value={shakhesReport?.data.staffTrainingReport.coursesSignedUp.toString() || ''}
                            />
                            <MapReportInfoBadge
                                label={shakhesReport?.data.staffTrainingReport.coursesWatchedHoursTitle || ''}
                                value={shakhesReport?.data.staffTrainingReport.coursesWatchedHours.toString() || ''}
                            />
                        </MapReportCollapse>
                    </MapReportInfoCard>
                </div>
            </FetchingBoundary>
        </div>
    )
}

export default MapReportInfo

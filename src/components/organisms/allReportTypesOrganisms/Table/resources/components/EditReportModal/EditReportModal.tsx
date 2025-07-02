import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SDropZone } from '@molecules/SDropZone'
import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SMultiSelect } from '@atoms/SMultiSelect'
import { SNumberInput } from '@atoms/SNumberInput'
import { SSelect } from '@atoms/SSelect'

import { MONTHLY_DURATION_LIST, REPORT_TYPES_LIST } from '@core/constants/dummy-data'
import { QueryKeysEnum } from '@core/enums/query-keys'
import { postUpdateReportMutationFn } from '@core/services/api/report/post-update-report'
import { useGetAllCompanies } from '@core/services/hooks/company/useGetAllCompanies'
import { useGetAllCompanySystemTypesQueryFn } from '@core/services/hooks/company/useGetAllCompanySystemTypesQueryFn'
import { useGetAllDocumentFormats } from '@core/services/hooks/report/useGetAllDocumentFormats'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { editReportSchema, type IEditReportModalProps, type TEditReportForm } from './resources'

const EditReportModal: FC<IEditReportModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TEditReportForm>({
        resolver: yupResolver(editReportSchema)
    })

    const { data: allCompanies, isLoading: isLoadingAllCompanies } = useGetAllCompanies({
        pageNumber: 1,
        pageSize: 1000
    })
    const { data: allCompanySystemType, isLoading: isLoadingCompanySystemType } = useGetAllCompanySystemTypesQueryFn({})
    const { data: allDocumentFormats, isLoading: isLoadingDocumentFormats } = useGetAllDocumentFormats({})

    const { mutate, isPending } = useMutation({
        mutationFn: postUpdateReportMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'گزارش با موفقیت ویرایش شد')

            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllReports]
            })

            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ویرایش گزارش با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    companyTypeId: value.companyTypeId ? value.companyTypeId.map((item) => +item) : undefined,
                    dayLimit: +value.dayLimit,
                    documentFormatId: value.documentFormatId ? +value.documentFormatId : undefined,
                    reportType: +value.reportType,
                    documentId: value.documentId ? value.documentId : undefined,
                    timePeriod: +value.timePeriod,
                    title: value.title,
                    companyId: value.companyId ? +value.companyId : undefined,
                    reportId: data?.reportId ?? -1
                })
            )}
        >
            <Controller
                name='title'
                control={control}
                defaultValue={data?.title ?? ''}
                render={({ field }) => (
                    <SInputField label='عنوان' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='عنوان گزارش را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='reportType'
                control={control}
                defaultValue={data?.reportType.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='نوع' errors={errors} name={field.name}>
                        <SSelect data={REPORT_TYPES_LIST} {...field} placeholder='نوع گزارش را انتخاب کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='documentFormatId'
                control={control}
                defaultValue={data?.documentFormatId.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='فرمت' errors={errors} name={field.name} required={false}>
                        <SSelect
                            isLoading={isLoadingDocumentFormats}
                            data={convertDataSelectList(allDocumentFormats?.data)}
                            {...field}
                            searchable
                            placeholder='فرمت فایل را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='dayLimit'
                control={control}
                defaultValue={data?.limitDay.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='محدودیت زمانی (روز)' errors={errors} name={field.name}>
                        <SNumberInput
                            max={29}
                            allowLeadingZeros={false}
                            allowNegative={false}
                            {...field}
                            placeholder='محدودیت زمانی (روز) را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='companyTypeId'
                control={control}
                defaultValue={data?.typeOfCompanies.map((item) => item.id.toString())}
                render={({ field }) => (
                    <SInputField label='نوع شرکت' errors={errors} name={field.name}>
                        <SMultiSelect
                            isLoading={isLoadingCompanySystemType}
                            data={convertDataSelectList(allCompanySystemType?.data)}
                            {...field}
                            placeholder='نوع شرکت را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='companyId'
                control={control}
                defaultValue={data?.companyId?.toString() ?? ''}
                render={({ field }) => (
                    <SInputField required={false} label='شرکت' errors={errors} name={field.name}>
                        <SSelect
                            isLoading={isLoadingAllCompanies}
                            data={convertDataSelectList(allCompanies?.data.data)}
                            {...field}
                            placeholder='شرکت را وارد کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='timePeriod'
                control={control}
                defaultValue={data?.timePeriod.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='دوره زمانی' errors={errors} name={field.name}>
                        <SSelect data={MONTHLY_DURATION_LIST} {...field} placeholder='دوره زمانی  را انتخاب کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='documentId'
                control={control}
                defaultValue={data?.documentId?.toString() ?? ''}
                render={({ field }) => (
                    <SInputField
                        required={false}
                        className='col-span-full'
                        label='یک نمونه قالب برای شرکت ها'
                        errors={errors}
                        name={field.name}
                    >
                        <SDropZone accept={`.${data?.titleDocumentFormatId}`} {...field} />
                    </SInputField>
                )}
            />

            <div className='col-span-full flex items-center justify-end gap-3 sticky -bottom-4 bg-white py-5 z-50'>
                <SButton onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledSecondary'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default EditReportModal

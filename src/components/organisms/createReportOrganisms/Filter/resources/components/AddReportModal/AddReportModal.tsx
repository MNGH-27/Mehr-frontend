import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ChartArea, Layers2, Notebook, NotebookPen } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'

import { CHART_TYPE_LIST } from '@core/constants/dummy-data'
import { QueryKeysEnum } from '@core/enums/query-keys'
import { postCreateNewReportItemMutationFn } from '@core/services/api/report/post-create-new-report-item'
import { useGetAllReportGradeType } from '@core/services/hooks/report/useGetAllReportGradeType'
import { useGetAllReportType } from '@core/services/hooks/report/useGetAllReportType'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { addUserSchema, type IAddReportModalProps, type TAddReportForm } from './resources'

const AddReportModal: FC<IAddReportModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TAddReportForm>({
        resolver: yupResolver(addUserSchema)
    })

    const { data: reportType, isLoading: isLoadingReportType } = useGetAllReportType({})
    const { data: reportGrade, isLoading: isLoadingReportGrade } = useGetAllReportGradeType({})

    const { mutate, isPending } = useMutation({
        mutationFn: postCreateNewReportItemMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سازمان با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.ReportItemsByRegionId]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت سازمان با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid sm:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) => {
                mutate({
                    description: value.description,
                    reportType: +value.reportType,
                    title: value.title,
                    items: [],
                    reportChart: +value.reportChart,
                    reportGradeType: +value.reportGradeType
                })
            })}
        >
            <Controller
                name='title'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام' errors={errors} name={field.name}>
                        <SInput leftSection={<NotebookPen />} {...field} placeholder='نام را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <SInputField label='توضیح' errors={errors} name={field.name}>
                        <SInput leftSection={<Notebook />} {...field} placeholder='توضیح را انتخاب کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='reportChart'
                control={control}
                render={({ field }) => (
                    <SInputField label='نوع نمودار' errors={errors} name={field.name}>
                        <SSelect
                            data={CHART_TYPE_LIST}
                            leftSection={<ChartArea />}
                            {...field}
                            placeholder='نوع نمودار را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='reportType'
                control={control}
                render={({ field }) => (
                    <SInputField label='نوع گزارش' errors={errors} name={field.name}>
                        <SSelect
                            data={convertDataSelectList(reportType?.data.filter((item) => item.id !== 0))}
                            isLoading={isLoadingReportType}
                            leftSection={<Layers2 />}
                            {...field}
                            placeholder='نوع گزارش را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='reportGradeType'
                control={control}
                render={({ field }) => (
                    <SInputField label='کلاس' errors={errors} name={field.name}>
                        <SSelect
                            data={convertDataSelectList(reportGrade?.data.filter((item) => item.id !== 0))}
                            isLoading={isLoadingReportGrade}
                            leftSection={<Layers2 />}
                            {...field}
                            placeholder='کلاس را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledSecondary'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default AddReportModal

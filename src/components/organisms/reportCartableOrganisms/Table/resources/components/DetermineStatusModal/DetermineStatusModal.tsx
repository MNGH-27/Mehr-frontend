import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SDatePicker } from '@atoms/SDatePicker'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postChangeStatusCompanyReportMutationFn } from '@core/services/api/report/post-change-status-company-report'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDateMicroseconds } from '@core/utils/common/convert-date-micro-seconds'

import { determineSchema, type IDetermineStatusModalProps, type TDetermineModalForm } from './resources'

const DetermineStatusModal: FC<IDetermineStatusModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<TDetermineModalForm>({
        resolver: yupResolver(determineSchema)
    })

    const statusWatch = watch('status')

    const { mutate, isPending } = useMutation({
        mutationFn: postChangeStatusCompanyReportMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'وضعیت گزارش با موفقیت تعیین شد')

            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.CompanyReportByUserId]
            })
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.KartableReport]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'تعیین وضعیت گزارش با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    ...value,
                    companyReportId: data?.companyReportId ?? -1,
                    status: +value.status,
                    exteraTime: value.exteraTime ? convertDateMicroseconds(value.exteraTime) : undefined
                })
            )}
        >
            <Controller
                name='status'
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <SInputField className='col-span-full' label='وضعیت گزارش' errors={errors} name={field.name}>
                        <SSelect
                            data={[
                                {
                                    label: 'تایید',
                                    value: '1'
                                },
                                {
                                    label: 'عدم تایید',
                                    value: '2'
                                },
                                {
                                    label: 'قفل',
                                    value: '3'
                                }
                            ]}
                            {...field}
                            placeholder='وضعیت گزارش را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            {statusWatch === '2' && (
                <>
                    <Controller
                        name='message'
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <SInputField label='توضیح' errors={errors} name={field.name}>
                                <SInput {...field} placeholder='توضیح را انتخاب کنید' />
                            </SInputField>
                        )}
                    />
                    <Controller
                        name='exteraTime'
                        control={control}
                        render={({ field }) => (
                            <SInputField required={false} label='زمان اضافه' errors={errors} name={field.name}>
                                <SDatePicker {...field} placeholder='زمان اضافه را وارد کنید' />
                            </SInputField>
                        )}
                    />
                </>
            )}

            <div className='col-span-full flex items-center justify-end gap-3 sticky -bottom-7 bg-white py-5 z-50'>
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

export default DetermineStatusModal

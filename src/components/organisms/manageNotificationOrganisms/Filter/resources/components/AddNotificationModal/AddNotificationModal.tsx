import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SDropZone } from '@molecules/SDropZone'
import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'
import { STextArea } from '@atoms/STextArea'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAddNewNewsMutationFn } from '@core/services/api/news/post-add-new-news'
import { useGetAllCompanySystemTypesQueryFn } from '@core/services/hooks/company/useGetAllCompanySystemTypesQueryFn'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { addCompanySchema, type IAddNotificationModalProps, type TAddNotificationForm } from './resources'

const AddNotificationModal: FC<IAddNotificationModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TAddNotificationForm>({
        resolver: yupResolver(addCompanySchema)
    })

    const { data: allCompanySystemType, isLoading: isLoadingCompanySystemType } = useGetAllCompanySystemTypesQueryFn({
        type: 2
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postAddNewNewsMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'شرکت با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.News]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت شرکت با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) => {
                mutate({
                    ...value,
                    documentId: value.documentId ? value.documentId : undefined,
                    systemTypeId: +value.systemTypeId,
                    newsType: +value.newsType,
                    description: value.description ? value.description : undefined
                })
            })}
        >
            <Controller
                name='title'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='عنوان اعلان' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='عنوان شرکت را وارد کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='systemTypeId'
                control={control}
                render={({ field }) => (
                    <SInputField label='نوع اعلان' errors={errors} name={field.name}>
                        <SSelect
                            isLoading={isLoadingCompanySystemType}
                            data={convertDataSelectList(allCompanySystemType?.data)}
                            {...field}
                            placeholder='نوع اعلان را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='subTitle'
                control={control}
                render={({ field }) => (
                    <SInputField label='توضیح اعلان' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='توضیح اعلان را وارد کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='newsType'
                control={control}
                render={({ field }) => (
                    <SInputField label='وضعیت اعلان' errors={errors} name={field.name}>
                        <SSelect
                            data={[
                                {
                                    value: '1',
                                    label: 'منتشر شده'
                                },
                                {
                                    label: 'پیش نویس',
                                    value: '2'
                                }
                            ]}
                            {...field}
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <SInputField
                        required={false}
                        className='col-span-full'
                        label='متن اعلان'
                        errors={errors}
                        name={field.name}
                    >
                        <STextArea placeholder='متن اعلان را وارد کنید' {...field} />
                    </SInputField>
                )}
            />

            <Controller
                name='documentId'
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <SInputField
                        required={false}
                        className='col-span-full'
                        label='فایل اعلان'
                        errors={errors}
                        name={field.name}
                    >
                        <SDropZone {...field} />
                    </SInputField>
                )}
            />

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

export default AddNotificationModal

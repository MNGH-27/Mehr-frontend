import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAddCompanySystemTypeMutationFn } from '@core/services/api/company/post-add-company-system-type'
import { type TCriticalAny } from '@core/types/type-any'

import {
    addCompanySystemTypeSchema,
    type IAddNotificationSystemTypeModalProps,
    type TAddCompanySystemTypeForm
} from './resources'

const AddNotificationSystemTypeModal: FC<IAddNotificationSystemTypeModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TAddCompanySystemTypeForm>({
        resolver: yupResolver(addCompanySystemTypeSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postAddCompanySystemTypeMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'دسته بندی شرکت با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllCompanySystemTypes]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت دسته بندی شرکت با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) => mutate({ ...value, englishName: 'default', type: 2 }))}
        >
            <Controller
                name='name'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام فارسی' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام فارسی را وارد کنید' />
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

export default AddNotificationSystemTypeModal

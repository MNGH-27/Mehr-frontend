import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postUpdateRoleMutationFn } from '@core/services/api/user/post-update-role'
import { type TCriticalAny } from '@core/types/type-any'

import { editRoleSchema, type IEditRoleModalProps, type TEditRoleForm } from './resources'

const EditRoleModal: FC<IEditRoleModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TEditRoleForm>({
        resolver: yupResolver(editRoleSchema),
        defaultValues: {
            persianName: data?.name
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postUpdateRoleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'نقش با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllRoles]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت نقش با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) => mutate({ ...value, englishName: 'default', roleId: data?.id ?? -1 }))}
        >
            <Controller
                name='persianName'
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

export default EditRoleModal

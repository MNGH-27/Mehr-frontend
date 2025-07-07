import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { NotebookPen } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { putUpdateRoleMutationFn } from '@core/services/api/Role/put-update-role'
import { type TCriticalAny } from '@core/types/type-any'

import { addUserSchema, type IUpdateRoleModalProps, type TUpdateRoleForm } from './resources'

const UpdateRoleModal: FC<IUpdateRoleModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TUpdateRoleForm>({
        resolver: yupResolver(addUserSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: putUpdateRoleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'نقش با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllRole]
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
            className='grid gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    roleName: value.roleName,
                    roleId: data?.id ?? -1
                })
            )}
        >
            <Controller
                name='roleName'
                control={control}
                defaultValue={data?.name ?? ''}
                render={({ field }) => (
                    <SInputField label='عنوان' errors={errors} name={field.name}>
                        <SInput leftSection={<NotebookPen />} {...field} placeholder='عنوان را وارد کنید' />
                    </SInputField>
                )}
            />

            {/* <Controller
                name='description'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='توضیح' errors={errors} name={field.name}>
                        <SInput leftSection={<Notebook />} {...field} placeholder='توضیح را وارد کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='organTypes'
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <SInputField label='توضیح' errors={errors} name={field.name}>
                        <SMultiSelect
                            data={convertDataSelectList(allOrganTypes?.data)}
                            isLoading={isLoadingAllOrganTypes}
                            leftSection={<UserCheck2 />}
                            {...field}
                            placeholder='توضیح را وارد کنید'
                        />
                    </SInputField>
                )}
            /> */}

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

export default UpdateRoleModal

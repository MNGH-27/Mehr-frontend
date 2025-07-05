import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Building2 } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postCreateOrganTypeMutationFn } from '@core/services/api/organ/post-create-organ-type'
import { type TCriticalAny } from '@core/types/type-any'

import { addUserSchema, type IAddOrganTypeModalProps, type TAddOrganTypeForm } from './resources'

const AddOrganTypeModal: FC<IAddOrganTypeModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TAddOrganTypeForm>({
        resolver: yupResolver(addUserSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postCreateOrganTypeMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'نوع سازمان با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.GetAllOrganType]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت نوع سازمان با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    Name: value.Name
                })
            )}
        >
            <Controller
                name='Name'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='عنوان' errors={errors} name={field.name}>
                        <SInput leftSection={<Building2 />} {...field} placeholder='عنوان را وارد کنید' />
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

export default AddOrganTypeModal

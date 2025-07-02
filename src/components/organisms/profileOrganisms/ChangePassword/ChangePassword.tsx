'use client'

import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postUpdateSignUpUserMutationFn } from '@core/services/api/sign-up/post-update-signup-user'
import { type TCriticalAny } from '@core/types/type-any'

import { changePasswordSchema, type IChangePasswordProps, type TChangePasswordTypeForm } from './resources'

const ChangePassword: FC<IChangePasswordProps> = ({ data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TChangePasswordTypeForm>({
        resolver: yupResolver(changePasswordSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postUpdateSignUpUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            if (response.data.message) {
                toast.success(response.data.message)
            } else toast.success('رمز عبور تغییر کرد')

            //invalidate query
            queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.UserDataByUserId] })
        },
        onError: (error: TCriticalAny) => {
            if (error.data.message) {
                toast.error(error.data.message)
            } else toast.error('ویرایش رمز عبور با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    email: data?.email ?? '',
                    firstName: data?.firstName ?? '',
                    lastName: data?.lastName ?? '',
                    phoneNumber: data?.phoneNumber ?? '',
                    confirmPassword: value.repeatedPassword,
                    password: value.password
                })
            )}
        >
            <Controller
                name='password'
                control={control}
                render={({ field }) => (
                    <SInputField label='کلمه عبور جدید' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='رمز عبور جدید خود را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='repeatedPassword'
                control={control}
                render={({ field }) => (
                    <SInputField label='تکرار کلمه عبور جدید' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='تکرار رمز عبور جدید خود را وارد کنید' />
                    </SInputField>
                )}
            />
            <SButton isLoading={isPending} size='M' variant='FilledPrimary' className='!w-fit'>
                تغییر رمز عبور
            </SButton>
        </form>
    )
}

export default ChangePassword

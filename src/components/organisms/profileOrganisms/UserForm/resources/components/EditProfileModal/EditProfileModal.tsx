import React, { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SNumberInput } from '@atoms/SNumberInput'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postUpdateSignUpUserMutationFn } from '@core/services/api/sign-up/post-update-signup-user'
import { useGetAllCompanies } from '@core/services/hooks/company/useGetAllCompanies'
import { useGetAllRoles } from '@core/services/hooks/user/useGetAllRoles'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { type IEditProfileModalProps, type TUserFormTypeForm, userFormTypeSchema } from './resources'

const EditProfileModal: FC<IEditProfileModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TUserFormTypeForm>({
        resolver: yupResolver(userFormTypeSchema)
    })

    const { data: companiesList, isLoading: isLoadingCompaniesList } = useGetAllCompanies({
        pageNumber: 1,
        pageSize: 1000
    })
    const { data: rolesList, isLoading: isLoadingRolesList } = useGetAllRoles({})

    const { mutate, isPending } = useMutation({
        mutationFn: postUpdateSignUpUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            if (response.data.message) {
                toast.success(response.data.message)
            } else toast.success('پروفایل کاربری ویرایش شد')

            //invalidate query
            queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.PersonalInfo] })

            //add id of uploaded file to parent form
            onClose()
        },
        onError: (error: TCriticalAny) => {
            if (error.data.message) {
                toast.error(error.data.message)
            } else toast.error('ویرایش پروفایل کاربری با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    ...value,
                    companyId: +value.company,
                    roleId: +value.role
                })
            )}
        >
            <Controller
                name='firstName'
                control={control}
                defaultValue={data?.firstName ?? ''}
                render={({ field }) => (
                    <SInputField label='نام' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام خود را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='lastName'
                control={control}
                defaultValue={data?.lastName ?? ''}
                render={({ field }) => (
                    <SInputField label='نام خانوادگی' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام خانوادگی خود را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='phoneNumber'
                control={control}
                defaultValue={data?.phoneNumber ?? ''}
                render={({ field }) => (
                    <SInputField label='تلفن همراه' errors={errors} name={field.name}>
                        <SNumberInput
                            allowLeadingZeros
                            allowNegative={false}
                            {...field}
                            placeholder='شماره همراه خود را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='nationalCode'
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <SInputField label='کد‌ملی' errors={errors} name={field.name}>
                        <SNumberInput
                            allowLeadingZeros
                            allowNegative={false}
                            {...field}
                            placeholder='کد‌ملی خود را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='email'
                control={control}
                defaultValue={data?.email ?? ''}
                render={({ field }) => (
                    <SInputField label='ایمیل' errors={errors} name={field.name}>
                        <SInput inputType='other' {...field} placeholder='email@gmail.com' />
                    </SInputField>
                )}
            />
            <Controller
                name='company'
                control={control}
                defaultValue={data?.companyId.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='شرکت' errors={errors} name={field.name}>
                        <SSelect
                            data={convertDataSelectList(companiesList?.data.data)}
                            isLoading={isLoadingCompaniesList}
                            {...field}
                            placeholder='فسا'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='role'
                control={control}
                defaultValue={data?.roleId.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='سمت در شرکت' errors={errors} name={field.name}>
                        <SSelect
                            data={convertDataSelectList(rolesList?.data)}
                            isLoading={isLoadingRolesList}
                            {...field}
                            placeholder='سمت در شرکت'
                        />
                    </SInputField>
                )}
            />
            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton onClick={onClose} type='button' size='M' variant='OutlinePrimary' className='!w-fit'>
                    بازگشت
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledPrimary' className='!w-fit'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default EditProfileModal

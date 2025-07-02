import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAddUserMutationFn } from '@core/services/api/user/post-add-user'
import { useGetAllCompanies } from '@core/services/hooks/company/useGetAllCompanies'
import { useGetAllCompanyPositions } from '@core/services/hooks/user/useGetAllCompanyPositions'
import { useGetAllRoles } from '@core/services/hooks/user/useGetAllRoles'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { addUserSchema, type IAddUserModalProps, type TAddUserForm } from './resources'

const AddUserModal: FC<IAddUserModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TAddUserForm>({
        resolver: yupResolver(addUserSchema)
    })

    const { data: allCompanySystemType, isLoading: isLoadingCompanySystemType } = useGetAllCompanies({
        pageNumber: 1,
        pageSize: 1000
    })
    const { data: allRoles, isLoading: isLoadingAllRoles } = useGetAllRoles({})
    const { data: allCompanyPositions, isLoading: isLoadingAllCompanyPositions } = useGetAllCompanyPositions({})

    const { mutate, isPending } = useMutation({
        mutationFn: postAddUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'کاربر با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllUsers1]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت کاربر با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    companyId: +value.companyId,
                    confirmPassword: value.confirmPassword,
                    email: value.email,
                    firstName: value.firstName,
                    lastName: value.lastName,
                    nationalCode: value.nationalCode,
                    password: value.password,
                    phoneNumber: value.phoneNumber,
                    roleId: value.roleId ? +value.roleId : undefined,
                    role: +value.role
                })
            )}
        >
            <Controller
                name='firstName'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام کاربر' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام کاربر را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='lastName'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام‌خانوادگی کاربر' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام‌خانوادگی کاربر را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                    <SInputField label='شماره تلفن' errors={errors} name={field.name}>
                        <SInput inputType='number' maxLength={11} {...field} placeholder='شماره تلفن را انتخاب کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='ایمیل' errors={errors} name={field.name}>
                        <SInput inputType='other' {...field} placeholder='ایمیل را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='nationalCode'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='کد‌ملی' errors={errors} name={field.name}>
                        <SInput maxLength={10} inputType='other' {...field} placeholder='کد‌ملی را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='companyId'
                control={control}
                render={({ field }) => (
                    <SInputField label='شرکت' errors={errors} name={field.name}>
                        <SSelect
                            isLoading={isLoadingCompanySystemType}
                            data={convertDataSelectList(allCompanySystemType?.data.data)}
                            {...field}
                            placeholder='شرکت را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='role'
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <SInputField label='سمت در شرکت' errors={errors} name={field.name} required={false}>
                        <SSelect
                            isLoading={isLoadingAllCompanyPositions}
                            data={convertDataSelectList(allCompanyPositions?.data)}
                            {...field}
                            placeholder='سمت در شرکت را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='roleId'
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <SInputField
                        className='col-span-full'
                        description='در صورتی که این کاربر نقشی در سامانه دارد میتوانید بر اساس نیازمندی آن دسترسی مورد نظر را انتخاب کنید در غیر این صورت این بخش را میتوانید خالی بگذارید'
                        label='جزئیات نقش مدیر'
                        errors={errors}
                        name={field.name}
                        required={false}
                    >
                        <SSelect
                            isLoading={isLoadingAllRoles}
                            data={convertDataSelectList(allRoles?.data)}
                            {...field}
                            placeholder='جزعیات نقش مدیر را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='password'
                control={control}
                render={({ field }) => (
                    <SInputField label='کلمه عبور' errors={errors} name={field.name}>
                        <SInput inputType='other' {...field} placeholder='کلمه عبور را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                    <SInputField label='تکرار رمز عبور' errors={errors} name={field.name}>
                        <SInput inputType='other' {...field} placeholder='تکرار کلمه عبور را وارد کنید' />
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

export default AddUserModal

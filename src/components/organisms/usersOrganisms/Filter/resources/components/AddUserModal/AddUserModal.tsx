import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Key, NotepadText, Phone, User2 } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SDatePicker } from '@atoms/SDatePicker'
import { SInput } from '@atoms/SInput'
import { SPasswordInput } from '@atoms/SPasswordInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postCreateUserMutationFn } from '@core/services/api/sign-up/post-create-user'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDateMicroseconds } from '@core/utils/common/convert-date-micro-seconds'

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

    const { mutate, isPending } = useMutation({
        mutationFn: postCreateUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'کاربر با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllUser]
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
                    firstName: value.firstName,
                    lastName: value.lastName,
                    natId: value.natId,
                    password: value.password,
                    phoneNumber: value.phoneNumber,
                    birthDate: convertDateMicroseconds(value.birthDate),
                    userName: value.userName
                })
            )}
        >
            <Controller
                name='firstName'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام' errors={errors} name={field.name}>
                        <SInput leftSection={<User2 />} {...field} placeholder='نام را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='lastName'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام‌خانوادگی' errors={errors} name={field.name}>
                        <SInput leftSection={<User2 />} {...field} placeholder='نام‌خانوادگی را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                    <SInputField label='شماره تلفن' errors={errors} name={field.name}>
                        <SInput
                            leftSection={<Phone />}
                            inputType='number'
                            maxLength={11}
                            {...field}
                            placeholder='شماره تلفن را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='userName'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام کاربری' errors={errors} name={field.name}>
                        <SInput
                            leftSection={<User2 />}
                            inputType='english-number'
                            {...field}
                            placeholder='نام کاربری را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='natId'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='کد‌ملی' errors={errors} name={field.name}>
                        <SInput
                            leftSection={<NotepadText />}
                            maxLength={10}
                            inputType='other'
                            {...field}
                            placeholder='کد‌ملی را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='birthDate'
                control={control}
                render={({ field }) => (
                    <SInputField label='تاریخ تولد' errors={errors} name={field.name}>
                        <SDatePicker {...field} placeholder='تاریخ تولد را وارد کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='password'
                control={control}
                render={({ field }) => (
                    <SInputField label='کلمه عبور' errors={errors} name={field.name}>
                        <SPasswordInput leftSection={<Key />} {...field} placeholder='کلمه عبور را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                    <SInputField label='تکرار رمز عبور' errors={errors} name={field.name}>
                        <SPasswordInput leftSection={<Key />} {...field} placeholder='تکرار کلمه عبور را وارد کنید' />
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

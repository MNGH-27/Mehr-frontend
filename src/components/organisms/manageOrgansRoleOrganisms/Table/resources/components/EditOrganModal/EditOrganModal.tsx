import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Building, Building2, Phone, User2 } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SNumberInput } from '@atoms/SNumberInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { putUpdateOrganMutationFn } from '@core/services/api/organ/put-update-organ'
import { type TCriticalAny } from '@core/types/type-any'

import { editOrganSchema, type IEditOrganModalProps, type TEditUserForm } from './resources'

const EditOrganModal: FC<IEditOrganModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TEditUserForm>({
        resolver: yupResolver(editOrganSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: putUpdateOrganMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سازمان با موفقیت ویرایش شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllOrgan]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ویرایش سازمان با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    code: +value.code,
                    fullAddress: value.fullAddress,
                    organId: data?.id ?? -1,
                    organName: value.organName,
                    phoneNumber: value.phoneNumber
                })
            )}
        >
            <Controller
                name='organName'
                control={control}
                defaultValue={data?.name ?? ''}
                render={({ field }) => (
                    <SInputField label='نام' errors={errors} name={field.name}>
                        <SInput leftSection={<Building2 />} {...field} placeholder='نام را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='phoneNumber'
                control={control}
                defaultValue={data?.phoneNumber ?? ''}
                render={({ field }) => (
                    <SInputField label='تلفن' errors={errors} name={field.name}>
                        <SInput
                            leftSection={<Phone />}
                            inputType='number'
                            maxLength={11}
                            {...field}
                            placeholder='تلفن را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='code'
                control={control}
                defaultValue={data?.code.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='کد' errors={errors} name={field.name}>
                        <SNumberInput
                            leftSection={<Building />}
                            maxLength={11}
                            {...field}
                            placeholder='کد را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='fullAddress'
                control={control}
                defaultValue={data?.fullAddress ?? ''}
                render={({ field }) => (
                    <SInputField className='col-span-full' label='آدرس' errors={errors} name={field.name}>
                        <SInput leftSection={<User2 />} {...field} placeholder='آدرس را وارد کنید' />
                    </SInputField>
                )}
            />

            <div className='col-span-full flex items-center justify-end gap-3 sticky -bottom-7 bg-white py-5 z-50'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton type='submit' isLoading={isPending} size='M' variant='FilledSecondary'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default EditOrganModal

import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Building, Building2, Layers, Layers3, Phone, User2 } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SNumberInput } from '@atoms/SNumberInput'
import { SSelect } from '@atoms/SSelect'

import { ORGAN_LEVEL_LIST } from '@core/constants/dummy-data'
import { QueryKeysEnum } from '@core/enums/query-keys'
import { postCreateOrganMutationFn } from '@core/services/api/organ/post-create-organ'
import { useGetAllRegions } from '@core/services/hooks/basic-info/useGetAllRegions'
import { useGetAllState } from '@core/services/hooks/basic-info/useGetAllState'
import { useGetAllOrganTypeNoPage } from '@core/services/hooks/organ/useGetAllOrganTypeNoPage'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { addUserSchema, type IAddOrganModalProps, type TAddOrganForm } from './resources'

const AddOrganModal: FC<IAddOrganModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue
    } = useForm<TAddOrganForm>({
        resolver: yupResolver(addUserSchema)
    })

    const stateIdWatch = watch('stateId')

    const { data: statesList, isLoading: isLoadingAllState } = useGetAllState({})
    const { data: regionList, isLoading: isLoadingAllRegion } = useGetAllRegions({
        StateId: stateIdWatch
    })
    const { data: organTypes, isLoading: isLoadingAllOrganTypes } = useGetAllOrganTypeNoPage({})

    const { mutate, isPending } = useMutation({
        mutationFn: postCreateOrganMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سازمان با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllOrgan]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت سازمان با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    organName: value.organName,
                    code: +value.code,
                    fullAddress: value.fullAddress,
                    organLevel: +value.organLevel,
                    organTypeId: +value.organTypeId,
                    phoneNumber: value.phoneNumber,
                    regionId: +value.regionId,
                    stateId: +value.stateId
                })
            )}
        >
            <Controller
                name='organName'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نام' errors={errors} name={field.name}>
                        <SInput leftSection={<Building2 />} {...field} placeholder='نام را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='phoneNumber'
                control={control}
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
                name='organTypeId'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='نوع سازمان' errors={errors} name={field.name}>
                        <SSelect
                            leftSection={<Layers3 />}
                            data={convertDataSelectList(organTypes?.data)}
                            isLoading={isLoadingAllOrganTypes}
                            {...field}
                            placeholder='نوع سازمان را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='stateId'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField label='استان' errors={errors} name={field.name}>
                        <SSelect
                            leftSection={<Layers />}
                            data={convertDataSelectList(statesList?.data)}
                            isLoading={isLoadingAllState}
                            {...field}
                            onChange={(value) => {
                                field.onChange(value)
                                setValue('regionId', '')
                            }}
                            placeholder='استان را وارد کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='regionId'
                control={control}
                render={({ field }) => (
                    <SInputField label='منطقه' errors={errors} name={field.name}>
                        <SSelect
                            leftSection={<Layers />}
                            data={convertDataSelectList(regionList?.data)}
                            isLoading={isLoadingAllRegion}
                            {...field}
                            placeholder='منطقه را وارد کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='organLevel'
                control={control}
                render={({ field }) => (
                    <SInputField label='سطح سازمان' errors={errors} name={field.name}>
                        <SSelect
                            leftSection={<Layers />}
                            data={ORGAN_LEVEL_LIST}
                            {...field}
                            placeholder='سطح سازمان را وارد کنید'
                        />
                    </SInputField>
                )}
            />

            <Controller
                name='fullAddress'
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <SInputField className='col-span-full' label='آدرس' errors={errors} name={field.name}>
                        <SInput leftSection={<User2 />} {...field} placeholder='آدرس را وارد کنید' />
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

export default AddOrganModal

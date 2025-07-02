import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAddNewExceptionRuleMutationFn } from '@core/services/api/exception-rule/post-add-new-exception-rule'
import { type TCriticalAny } from '@core/types/type-any'

import {
    addNewAdditionalModalSchema,
    type IAddNewAdditionalModalModalProps,
    type TAddNewAdditionalModalForm,
    YEARS_LIST
} from './resources'

const AddNewAdditionalModal: FC<IAddNewAdditionalModalModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TAddNewAdditionalModalForm>({
        resolver: yupResolver(addNewAdditionalModalSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postAddNewExceptionRuleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سال استثنا جدید با موفقیت انجام شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.ExceptionRules]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'سال استثنا جدید با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='flex flex-col gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    exceptionYear: +value.exceptionYear,
                    exceptionRuleType: 3
                })
            )}
        >
            <Controller
                name='exceptionYear'
                control={control}
                render={({ field }) => (
                    <SInputField label='سال استثنا جدید' errors={errors} name={field.name}>
                        <SSelect {...field} data={YEARS_LIST} placeholder='سال استثنا جدید را انتخاب کنید' />
                    </SInputField>
                )}
            />
            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlinePrimary'>
                    انصراف
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledPrimary'>
                    تایید و ثبت
                </SButton>
            </div>
        </form>
    )
}

export default AddNewAdditionalModal

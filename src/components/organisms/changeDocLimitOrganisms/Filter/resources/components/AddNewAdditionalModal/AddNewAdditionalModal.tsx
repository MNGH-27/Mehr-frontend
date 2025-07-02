import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SNumberInput } from '@atoms/SNumberInput'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAddNewExceptionRuleMutationFn } from '@core/services/api/exception-rule/post-add-new-exception-rule'
import { useGetAllCompaniesRules } from '@core/services/hooks/company/useGetAllCompaniesRules'
import { useGetAllReportForCompanyByCompanyId } from '@core/services/hooks/report/useGetAllReportForCompanyByCompanyId'
import { useGetLimitTimeByReportId } from '@core/services/hooks/report/useGetLimitTimeByReportId'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import {
    addNewAdditionalModalSchema,
    type IAddNewAdditionalModalModalProps,
    type TAddNewAdditionalModalForm
} from './resources'

const AddNewAdditionalModal: FC<IAddNewAdditionalModalModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()
    const {
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<TAddNewAdditionalModalForm>({
        resolver: yupResolver(addNewAdditionalModalSchema)
    })

    const companyIdWatch = watch('companyId')
    const reportId = watch('systemTypeId')
    const { data: allCompany, isLoading: isLoadingCompany } = useGetAllCompaniesRules({})

    const { data: companyReports, isLoading: isLoadingCompanyReports } = useGetAllReportForCompanyByCompanyId({
        CompanyId: +companyIdWatch
    })

    const { data: limitTime } = useGetLimitTimeByReportId({ ReportId: +reportId })

    const { mutate, isPending } = useMutation({
        mutationFn: postAddNewExceptionRuleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'تغییر محدودیت زمانی برای انواع سند با موفقیت انجام شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.ExceptionRules]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'تغییر محدودیت زمانی برای انواع سند با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) =>
                mutate({
                    companyId: +value.companyId,
                    systemTypeId: +value.systemTypeId,
                    dayLimit: +value.dayLimit,
                    exceptionRuleType: 2
                })
            )}
        >
            <Controller
                name='companyId'
                control={control}
                render={({ field }) => (
                    <SInputField label='شرکت' errors={errors} name={field.name}>
                        <SSelect
                            isLoading={isLoadingCompany}
                            data={convertDataSelectList(allCompany?.data)}
                            {...field}
                            searchable
                            placeholder='شرکت را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='systemTypeId'
                control={control}
                render={({ field }) => (
                    <SInputField label='نوع گزارش' errors={errors} name={field.name}>
                        <SSelect
                            isLoading={isLoadingCompanyReports}
                            data={convertDataSelectList(companyReports?.data)}
                            {...field}
                            searchable
                            placeholder='نوع گزارش را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='dayLimit'
                control={control}
                render={({ field }) => (
                    <SInputField label='محدودیت زمانی' errors={errors} name={field.name}>
                        <SNumberInput
                            max={29}
                            {...field}
                            value={field.value ? field.value : limitTime?.data}
                            placeholder='محدودیت زمانی  را وارد کنید'
                        />
                    </SInputField>
                )}
            />

            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlinePrimary'>
                    بازگشت
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledPrimary'>
                    تایید و ثبت
                </SButton>
            </div>
        </form>
    )
}

export default AddNewAdditionalModal

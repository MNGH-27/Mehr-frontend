import { type FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SMultiSelect } from '@atoms/SMultiSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAssignUserToCompanyMutationFn } from '@core/services/api/user/post-assign-user-to-company'
import { useGetAllCompanies } from '@core/services/hooks/company/useGetAllCompanies'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { type IAssignModalProps } from './resources'

const AssignModal: FC<IAssignModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

    useEffect(() => {
        if (data?.myCompanies) {
            setSelectedCompanies(data.myCompanies.map((item) => item.companyId.toString()))
        }
    }, [data?.myCompanies])

    const { data: companiesList, isLoading: isLoadingCompaniesList } = useGetAllCompanies({
        pageNumber: 1,
        pageSize: 1000
    })
    const { mutate, isPending } = useMutation({
        mutationFn: postAssignUserToCompanyMutationFn,
        onSuccess: (response: TCriticalAny) => {
            if (response.data.message) {
                toast.success(response.data.message)
            } else toast.success('اضافه کردن کارکنان معاونت اقتصادی با موفقیت انجام شد')

            //invalidate query
            queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.KarkonanEghtesadiUser] })

            //add id of uploaded file to parent form
            onClose()
        },
        onError: (error: TCriticalAny) => {
            if (error.data.message) {
                toast.error(error.data.message)
            } else toast.error('اضافه کردن کارکنان معاونت اقتصادی با مشکل مواجه شد')
        }
    })

    return (
        <div className='space-y-5'>
            <SInputField
                name=''
                errors={{}}
                label='شرکت ها'
                labelDescription='شرکت هایی که میخواید این کارمند با آن ارتباط داشته باشد را انتخاب کنید'
            >
                <SMultiSelect
                    data={convertDataSelectList(companiesList?.data.data)}
                    isLoading={isLoadingCompaniesList}
                    onChange={(value) => setSelectedCompanies(value)}
                    value={selectedCompanies}
                />
            </SInputField>
            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton
                    isLoading={isPending}
                    onClick={() =>
                        mutate({
                            companyId: selectedCompanies.map((item) => +item),
                            roleId: data?.roleId ?? -1,
                            userId: data?.userId ?? -1
                        })
                    }
                    size='M'
                    variant='FilledSecondary'
                >
                    ثبت نهایی
                </SButton>
            </div>
        </div>
    )
}

export default AssignModal

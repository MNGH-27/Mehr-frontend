import { type FC, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { User2, UserCog2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postAddToUserOrganMutationFn } from '@core/services/api/user/post-add-to-user-organ'
import { useGetAllRole } from '@core/services/hooks/role/useGetAllRole'
import { useGetUserInfoByNatId } from '@core/services/hooks/user/useGetUserInfoByNatId'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { type IAddOrganRoleModalProps } from './resources'

const AddOrganRoleModal: FC<IAddOrganRoleModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const { organId } = useParams<{ organId: string }>()

    const [nationalCode, setNationalCode] = useState('')
    const [role, setRole] = useState('')

    const {
        data: userData,
        isLoading,
        isFetching
    } = useGetUserInfoByNatId({
        NatId: nationalCode.trim().length === 10 ? nationalCode : undefined
    })

    const { data: rolesList, isLoading: isLoadingAllRolesList } = useGetAllRole({
        pageNumber: 1,
        pageSize: 1000
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postAddToUserOrganMutationFn,
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
        <div className='grid gap-5'>
            <SInputField label='کد ملی' errors={{}} name={''}>
                <SInput
                    value={nationalCode}
                    inputType='number'
                    onChange={(value) => setNationalCode(value)}
                    leftSection={<User2 />}
                    maxLength={10}
                    placeholder='کد ملی را وارد کنید'
                />
            </SInputField>

            <FetchingBoundary isLoading={isLoading || isFetching} isError={false}>
                {userData && userData.data && (
                    <div>
                        <div className='py-5 border-y border-dashed mb-5'>
                            <div className='flex items-center justify-start gap-x-2'>
                                <span>نام</span>
                                <span className='font-semibold'>
                                    {userData.data.firstName + ' ' + userData.data.lastName}
                                </span>
                            </div>
                            <div className='flex items-center justify-start gap-x-2'>
                                <span>کد ملی</span>
                                <span className='font-semibold'>{userData.data.natId}</span>
                            </div>
                            <div className='flex items-center justify-start gap-x-2'>
                                <span>شماره همراه</span>
                                <span className='font-semibold'>{userData.data.phoneNumber}</span>
                            </div>
                        </div>

                        <SInputField label='نقش' errors={{}} name={''}>
                            <SSelect
                                value={role}
                                onChange={(value) => setRole(value ?? '')}
                                leftSection={<UserCog2 />}
                                data={convertDataSelectList(rolesList?.data.data)}
                                isLoading={isLoadingAllRolesList}
                                placeholder='نقش را وارد کنید'
                            />
                        </SInputField>
                    </div>
                )}
            </FetchingBoundary>

            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton
                    onClick={() => {
                        if (role.trim().length !== 0) {
                            mutate({
                                organId: +organId,
                                roleId: +role,
                                userNatId: nationalCode
                            })
                        } else {
                            toast.error('لطفا نقش را انتخاب کنید')
                        }
                    }}
                    isLoading={isPending}
                    size='M'
                    variant='FilledSecondary'
                >
                    ثبت نهایی
                </SButton>
            </div>
        </div>
    )
}

export default AddOrganRoleModal

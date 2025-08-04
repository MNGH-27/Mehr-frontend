import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Search } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SSelect } from '@atoms/SSelect'

import { postChangeRoleMutationFn } from '@core/services/api/user/post-change-role'
import { useGetRoleOrgan } from '@core/services/hooks/user/useGetRoleOrgan'
import { useAuthStore } from '@core/services/stores/auth.store'
import { type TCriticalAny } from '@core/types/type-any'

import { setOrganFormSchema } from './resources'

interface ISetRoleModalProps {
    onClose: () => void
}

const SetRoleModal: FC<ISetRoleModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()
    const { setUserData } = useAuthStore()

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(setOrganFormSchema)
    })

    const { data: userRoles, isLoading: isLoadingUserRoles } = useGetRoleOrgan({})

    const { mutate: changeRole, isPending: isChangingRole } = useMutation({
        mutationFn: postChangeRoleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success('نقش با موفقیت تغییر کرد')

            //reset all queries
            queryClient.resetQueries()

            const expirationDate = new Date()
            expirationDate.setHours(expirationDate.getHours() + 6)
            setUserData({
                token: response.data.token,
                lastRole: {
                    organId: response.data.lastUserRole.organId,
                    organName: response.data.lastUserRole.organName,
                    roleId: response.data.lastUserRole.roleId,
                    roleName: response.data.lastUserRole.roleName
                }
            })

            window.dispatchEvent(new CustomEvent('lastRoleChanged', { detail: response.data }))
            //close setRoleModal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'تغییر نقش با مشکل مواجه شد')
        }
    })

    return (
        <form
            onSubmit={handleSubmit((value) => {
                changeRole({
                    organId: +value.userRole.split('/')[0],
                    roleId: +value.userRole.split('/')[1]
                })
            })}
            className='flex flex-col gap-8'
        >
            <Controller
                name='userRole'
                control={control}
                render={({ field }) => (
                    <SInputField errors={errors} name={field.name} label='نقش خود را از بین نقش های زیر انتخاب کنید'>
                        <SSelect
                            data={userRoles?.data.map((item) => ({
                                label: item.roleName + ' در ' + item.organName,
                                value: item.organId + '/' + item.roleId
                            }))}
                            placeholder='نقش خود را جستجو کنید...'
                            leftSection={<Search size='16' />}
                            searchable
                            isLoading={isLoadingUserRoles}
                            {...field}
                        />
                    </SInputField>
                )}
            />

            <SButton isLoading={isChangingRole} type='submit' variant='FilledPrimary' size='M'>
                تایید و ثبت نهایی
            </SButton>
        </form>
    )
}

export default SetRoleModal

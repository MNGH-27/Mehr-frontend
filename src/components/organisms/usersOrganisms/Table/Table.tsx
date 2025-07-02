'use client'

import { type FC, useState } from 'react'
import { toast } from 'react-toastify'
import { UserCheck2, UserCog2, UserMinus, UserPen, UserX2 } from 'lucide-react'
import moment from 'moment-jalaali'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SMenu } from '@molecules/SMenu'
import { STable } from '@molecules/STable'

import { SBadge } from '@atoms/SBadge'
import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postChangeActivationUserMutationFn } from '@core/services/api/user/post-change-activation-user'
import { type TModalStateType } from '@core/types/modal-state-types'
import { type TCriticalAny } from '@core/types/type-any'

import { DeleteUserModal, EditUserModal, type IUsersTableProps, TABLE_HEAD } from './resources'

const UsersTable: FC<IUsersTableProps> = ({ data }) => {
    const queryClient = useQueryClient()

    const [changeActivationState, setChangeActivationState] = useState<{
        stage: 'active' | 'disActive'
        userId?: number
    }>({ stage: 'active' })

    const [deleteModal, setDeleteModal] = useState<TModalStateType<TCriticalAny>>({ isShow: false })
    const [editModal, setEditModal] = useState<TModalStateType<TCriticalAny>>({ isShow: false })

    const { mutate: mutateChangeActivationUser, isPending: isPendingChangeActivation } = useMutation({
        mutationFn: postChangeActivationUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'گزارش با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllUsers1]
            })
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت گزارش با مشکل مواجه شد')
        }
    })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.fullName} </STable.Td>
                        <STable.Td>{data.phoneNumber}</STable.Td>
                        <STable.Td>{data.email}</STable.Td>
                        <STable.Td>{data.companyName ?? '-'}</STable.Td>
                        <STable.Td>{data.roleName ? <SBadge variant='light'>{data.roleName}</SBadge> : '-'}</STable.Td>
                        <STable.Td>{moment(data.createDateTime).format('jYYYY/jMM/jDD')}</STable.Td>
                        <STable.Td>
                            <SBadge variant='light' color={data.isActive ? 'green' : 'red'}>
                                {data.isActive ? 'فعال' : 'غیر فعال'}
                            </SBadge>
                        </STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-5'>
                                <SButton
                                    onClick={() => setDeleteModal({ isShow: true, data })}
                                    size='None'
                                    variant='TextError'
                                >
                                    <UserMinus size={20} />
                                    حذف
                                </SButton>
                                <SButton
                                    onClick={() => setEditModal({ isShow: true, data })}
                                    size='None'
                                    variant='TextPrimary'
                                >
                                    <UserPen size={20} />
                                    ویرایش
                                </SButton>

                                <SMenu>
                                    <SMenu.Target>
                                        <button className='!text-secondary-800 flex items-center justify-center gap-x-1'>
                                            <UserCog2 size={20} />
                                            تغییر وضعیت
                                        </button>
                                    </SMenu.Target>

                                    <SMenu.Dropdown>
                                        <SMenu.Label>تغییر وضعیت کاربر</SMenu.Label>
                                        <SMenu.Item>
                                            <SButton
                                                variant='None'
                                                size='None'
                                                className='!text-success-light flex items-center justify-center gap-x-1'
                                                isLoading={
                                                    changeActivationState.stage === 'active' &&
                                                    changeActivationState.userId === data.userId &&
                                                    isPendingChangeActivation
                                                }
                                                onClick={() => {
                                                    //set state for showing loading
                                                    setChangeActivationState({
                                                        stage: 'active',
                                                        userId: data.userId
                                                    })

                                                    //send request to backend
                                                    mutateChangeActivationUser({
                                                        active: true,
                                                        userId: data.userId
                                                    })
                                                }}
                                            >
                                                <UserCheck2 />
                                                فعال
                                            </SButton>
                                        </SMenu.Item>
                                        <SMenu.Item>
                                            <SButton
                                                variant='None'
                                                size='None'
                                                className='!text-error-light flex items-center justify-center gap-x-1'
                                                isLoading={
                                                    changeActivationState.stage === 'disActive' &&
                                                    changeActivationState.userId === data.userId &&
                                                    isPendingChangeActivation
                                                }
                                                onClick={() => {
                                                    //set state for showing loading
                                                    setChangeActivationState({
                                                        stage: 'disActive',
                                                        userId: data.userId
                                                    })

                                                    //send request to backend
                                                    mutateChangeActivationUser({
                                                        active: false,
                                                        userId: data.userId
                                                    })
                                                }}
                                            >
                                                <UserX2 />
                                                غیر‌فعال
                                            </SButton>
                                        </SMenu.Item>
                                    </SMenu.Dropdown>
                                </SMenu>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                topSection={{
                    title: 'حدف کاربر',
                    description: 'با حذف کاربر، دسترسی های آن کاربر از دست خواهد رفت',
                    icon: <UserMinus size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteUserModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>

            <SModal
                topSection={{
                    title: 'ویرایش کاربر',
                    description:
                        'در ویرایش اطلاعات کاربر دقت کنید تغییر برخی اطلاعات ممکن است باعث اختلال در روند کار شود',
                    icon: <UserPen size={20} />
                }}
                onClose={() => setEditModal({ isShow: false })}
                opened={editModal.isShow}
            >
                <EditUserModal onClose={() => setEditModal({ isShow: false })} data={editModal.data} />
            </SModal>
        </>
    )
}

export default UsersTable

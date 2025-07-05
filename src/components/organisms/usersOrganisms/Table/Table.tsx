'use client'

import { type FC, useState } from 'react'
import { UserMinus, UserPen } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TUserListItemType } from '@core/types/api/users.types'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteUserModal, EditUserModal, type IUsersTableProps, TABLE_HEAD } from './resources'

const UsersTable: FC<IUsersTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TUserListItemType>>({ isShow: false })
    const [editModal, setEditModal] = useState<TModalStateType<TUserListItemType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.firstName + ' ' + data.lastName} </STable.Td>
                        <STable.Td>{data.phoneNumber}</STable.Td>
                        <STable.Td>{data.natId}</STable.Td>
                        <STable.Td>{moment(data.birthDate).format('jYYYY/jMM/jDD')}</STable.Td>

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

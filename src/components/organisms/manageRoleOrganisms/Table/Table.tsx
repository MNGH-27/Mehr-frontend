'use client'

import { type FC, useState } from 'react'
import { MinusSquare, UserMinus2, UserPen } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TIdNameType } from '@core/types/id-name/types'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteRoleModal, type IManageRoleTableProps, TABLE_HEAD, UpdateRoleModal } from './resources'

const ManageRoleTable: FC<IManageRoleTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TIdNameType>>({ isShow: false })
    const [updateModal, setUpdateModal] = useState<TModalStateType<TIdNameType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.name} </STable.Td>

                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-5'>
                                <SButton
                                    onClick={() => setDeleteModal({ isShow: true, data })}
                                    size='None'
                                    variant='TextError'
                                >
                                    <UserMinus2 size={20} />
                                    حذف
                                </SButton>
                                <SButton
                                    onClick={() => setUpdateModal({ isShow: true, data })}
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
                    title: `حذف نقش (${deleteModal.data?.name})`,
                    description: 'با حذف نقش، دسترسی های آن نقش از دست خواهد رفت',
                    icon: <MinusSquare size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteRoleModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>

            <SModal
                topSection={{
                    title: `ویرایش نقش (${updateModal.data?.name})`,
                    description: 'اطلاعات مورد نیاز برای ویرایش نقش را وارد کنید',
                    icon: <UserPen size={20} />
                }}
                onClose={() => setUpdateModal({ isShow: false })}
                opened={updateModal.isShow}
            >
                <UpdateRoleModal onClose={() => setUpdateModal({ isShow: false })} data={updateModal.data} />
            </SModal>
        </>
    )
}

export default ManageRoleTable

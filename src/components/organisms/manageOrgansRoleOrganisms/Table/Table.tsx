'use client'

import { type FC, useState } from 'react'
import Link from 'next/link'
import { Building2, MinusSquare, UserCog2, UserPen } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { Routes } from '@core/constants/routes'
import { type TOrganListItemType } from '@core/types/api/organ.types'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteOrganModal, EditOrganModal, type IManageOrgansRoleTableProps, TABLE_HEAD } from './resources'

const ManageOrgansRoleTable: FC<IManageOrgansRoleTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TOrganListItemType>>({ isShow: false })
    const [editModal, setEditModal] = useState<TModalStateType<TOrganListItemType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.name} </STable.Td>
                        <STable.Td>{data.phoneNumber}</STable.Td>
                        <STable.Td>{data.stateName}</STable.Td>
                        <STable.Td>{data.regionName}</STable.Td>
                        <STable.Td>{data.fullAddress}</STable.Td>
                        <STable.Td>{data.organLevelTitle ?? '-'}</STable.Td>

                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-5'>
                                <SButton
                                    component={Link}
                                    href={Routes.ManageOrgansRole(data.id)}
                                    size='None'
                                    variant='TextPrimary'
                                >
                                    <UserCog2 size={20} />
                                    مدیریت نقش های سازمان
                                </SButton>
                                <SButton
                                    onClick={() => setDeleteModal({ isShow: true, data })}
                                    size='None'
                                    variant='TextError'
                                >
                                    <Building2 size={20} />
                                    حذف
                                </SButton>
                                <SButton
                                    onClick={() => setEditModal({ isShow: true, data })}
                                    size='None'
                                    variant='TextPrimary'
                                >
                                    <Building2 size={20} />
                                    ویرایش
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                topSection={{
                    title: 'حذف سازمان',
                    description: 'با حذف سازمان، دسترسی های آن سازمان از دست خواهد رفت',
                    icon: <MinusSquare size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteOrganModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>

            <SModal
                topSection={{
                    title: 'ویرایش سازمان',
                    description:
                        'در ویرایش اطلاعات سازمان دقت کنید تغییر برخی اطلاعات ممکن است باعث اختلال در روند کار شود',
                    icon: <UserPen size={20} />
                }}
                onClose={() => setEditModal({ isShow: false })}
                opened={editModal.isShow}
            >
                <EditOrganModal onClose={() => setEditModal({ isShow: false })} data={editModal.data} />
            </SModal>
        </>
    )
}

export default ManageOrgansRoleTable

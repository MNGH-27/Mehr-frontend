'use client'

import { type FC, useState } from 'react'
import { MinusSquare, UserMinus2 } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TUserInOrganItemType } from '@core/types/api/users.types'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteOrganModal, type IManageOrgansRoleTableProps, TABLE_HEAD } from './resources'

const ManageOrgansRoleTable: FC<IManageOrgansRoleTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TUserInOrganItemType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.userFullName} </STable.Td>
                        <STable.Td>{data.userNatId}</STable.Td>
                        <STable.Td>{data.userPhoneNumber}</STable.Td>
                        <STable.Td>{data.roleName}</STable.Td>

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
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                topSection={{
                    title: `حذف نقش (${deleteModal.data?.roleName}) از شخص (${deleteModal.data?.userFullName})`,
                    description: 'با حذف نقش از این شخص دسترسی های آن در سازمان از دست خواهد رفت',
                    icon: <MinusSquare size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteOrganModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>
        </>
    )
}

export default ManageOrgansRoleTable

'use client'

import { type FC, useMemo, useState } from 'react'
import Link from 'next/link'
import { Edit3, Eye } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'
import { type TRoleType } from '@core/types/api/user/role'
import { type TModalStateType } from '@core/types/modal-state-types'

import { EditRoleModal, type IRolesFilterTableProps, TABLE_HEAD } from './resources'

const RolesFilterTable: FC<IRolesFilterTableProps> = ({ data }) => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(() => getSinglePermission(PERMISSIONS(Routes.Roles())), [getSinglePermission])
    const [editModal, setEditModal] = useState<TModalStateType<TRoleType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.name} </STable.Td>
                        {/* <STable.Td>{data.createdAt}</STable.Td> */}

                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-2'>
                                <SButton
                                    disabled={permission && !permission.lstAccessCodes.includes(3)}
                                    onClick={() =>
                                        setEditModal({
                                            isShow: true,
                                            data
                                        })
                                    }
                                    size='None'
                                    variant='TextPrimary'
                                >
                                    ویرایش
                                    <Edit3 size={20} />
                                </SButton>
                                <SButton
                                    component={Link}
                                    href={Routes.RolesPermissions(data.id)}
                                    size='None'
                                    variant='TextSecondary'
                                >
                                    دسترسی ها
                                    <Eye size={20} />
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                onClose={() =>
                    setEditModal({
                        isShow: false
                    })
                }
                opened={editModal.isShow}
                topSection={{
                    title: 'ویرایش نقش',
                    description: 'مشخصات نقش را وارد کنید:',
                    icon: <Edit3 size={20} />
                }}
            >
                <EditRoleModal
                    onClose={() =>
                        setEditModal({
                            isShow: false
                        })
                    }
                    data={editModal.data}
                />
            </SModal>
        </>
    )
}

export default RolesFilterTable

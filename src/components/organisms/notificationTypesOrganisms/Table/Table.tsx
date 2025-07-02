'use client'

import { type FC, useMemo, useState } from 'react'
import { Edit3, MinusSquare } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'
import { type TCompanySystemTypeType } from '@core/types/api/company/company-system-type'
import { type TModalStateType } from '@core/types/modal-state-types'

import {
    DeleteNotificationSystemTypeModal,
    EditNotificationSystemTypeModal,
    type INotificationTypesTableProps,
    TABLE_HEAD
} from './resources'

const NotificationTypesTable: FC<INotificationTypesTableProps> = ({ data }) => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(
        () => getSinglePermission(PERMISSIONS(Routes.NotificationSystemType())),
        [getSinglePermission]
    )

    const [editModal, setEditModal] = useState<TModalStateType<TCompanySystemTypeType>>({ isShow: false })
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TCompanySystemTypeType>>({ isShow: false })

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
                                    disabled={!permission || !permission.lstAccessCodes.includes(3)}
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
                                    disabled={permission && !permission.lstAccessCodes.includes(4)}
                                    onClick={() =>
                                        setDeleteModal({
                                            isShow: true,
                                            data
                                        })
                                    }
                                    size='None'
                                    variant='TextError'
                                >
                                    حذف
                                    <MinusSquare size={20} />
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
                    title: 'ویرایش دسته‌بندی اعلان',
                    description: 'مشخصات دسته‌بندی اعلان را وارد کنید:',
                    icon: <Edit3 size={20} />
                }}
            >
                <EditNotificationSystemTypeModal
                    onClose={() =>
                        setEditModal({
                            isShow: false
                        })
                    }
                    data={editModal.data}
                />
            </SModal>

            <SModal
                topSection={{
                    title: 'حدف دسته‌بندی اعلان',
                    description: 'با حذف دسته‌بندی اعلان، دسترسی های آن دسته‌بندی اعلان از دست خواهد رفت'
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteNotificationSystemTypeModal
                    onClose={() => setDeleteModal({ isShow: false })}
                    data={deleteModal.data}
                />
            </SModal>
        </>
    )
}

export default NotificationTypesTable

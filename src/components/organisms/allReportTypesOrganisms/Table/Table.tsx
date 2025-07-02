'use client'

import { type FC, useMemo, useState } from 'react'
import { FilePenLine, FolderMinus, PenLineIcon, Trash } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SBadge } from '@atoms/SBadge'
import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'
import { type TReportType } from '@core/types/api/report/report'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteReportModal, EditReportModal, type IAllReportTypesTableProps, TABLE_HEAD } from './resources'

const AllReportTypesTable: FC<IAllReportTypesTableProps> = ({ data }) => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(
        () => getSinglePermission(PERMISSIONS(Routes.ReportsAllTypesReports())),
        [getSinglePermission]
    )

    const [deleteModal, setDeleteModal] = useState<TModalStateType<TReportType>>({ isShow: false })
    const [editModal, setEditModal] = useState<TModalStateType<TReportType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.title} </STable.Td>
                        <STable.Td className='flex items-center justify-center gap-2 flex-wrap'>
                            {data.typeOfCompanies.length > 0
                                ? data.typeOfCompanies.map((item, index) => <SBadge key={index}>{item.name}</SBadge>)
                                : '-'}
                        </STable.Td>
                        <STable.Td>{data.typeName}</STable.Td>
                        <STable.Td>{data.stageName}</STable.Td>
                        <STable.Td>{data.limitDay} روز</STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-2'>
                                <SButton
                                    disabled={!permission || !permission.lstAccessCodes.includes(3)}
                                    onClick={() => {
                                        setEditModal({
                                            isShow: true,
                                            data
                                        })
                                    }}
                                    size='None'
                                    variant='TextPrimary'
                                >
                                    ویرایش
                                    <PenLineIcon size={20} />
                                </SButton>
                                <SButton
                                    disabled={!permission || !permission.lstAccessCodes.includes(4)}
                                    onClick={() => {
                                        setDeleteModal({
                                            isShow: true,
                                            data
                                        })
                                    }}
                                    size='None'
                                    variant='TextError'
                                >
                                    حذف
                                    <Trash size={20} />
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                topSection={{
                    title: 'حدف گزارش',
                    description: 'با حذف گزارش ممکن است که در دسترسی به اطلاعات های آن دچار مشکل شوید',
                    icon: <FolderMinus size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteReportModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>

            <SModal
                topSection={{
                    title: 'ویرایش گزارش',
                    description:
                        'در ویرایش اطلاعات گزارش دقت کنید تغییر برخی اطلاعات ممکن است باعث اختلال در روند کار شود',
                    icon: <FilePenLine size={20} />
                }}
                onClose={() => setEditModal({ isShow: false })}
                opened={editModal.isShow}
            >
                <EditReportModal onClose={() => setEditModal({ isShow: false })} data={editModal.data} />
            </SModal>
        </>
    )
}

export default AllReportTypesTable

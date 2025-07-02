'use client'

import { type FC, useMemo, useState } from 'react'
import { Edit3, MinusSquare, NotebookIcon } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'
import { type TCompanySystemTypeWithChildType } from '@core/types/api/company/company-system-type-with-child'
import { type TModalStateType } from '@core/types/modal-state-types'

import {
    DeleteCompanySystemTypeModal,
    DetailCompanySystemModal,
    EditCompanySystemTypeModal,
    type IRolesFilterTableProps,
    TABLE_HEAD
} from './resources'

const CompanyTypesTable: FC<IRolesFilterTableProps> = ({ data }) => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(() => getSinglePermission(PERMISSIONS(Routes.CompanyTypes())), [getSinglePermission])

    const [editModal, setEditModal] = useState<TModalStateType<TCompanySystemTypeWithChildType>>({ isShow: false })
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TCompanySystemTypeWithChildType>>({ isShow: false })
    const [detailModal, setDetailModal] = useState<TModalStateType<TCompanySystemTypeWithChildType>>({ isShow: false })

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
                                    disabled={permission && !permission.lstAccessCodes.includes(3)}
                                    onClick={() =>
                                        setDetailModal({
                                            isShow: true,
                                            data
                                        })
                                    }
                                    size='None'
                                    variant='TextSecondary'
                                    className='!w-fit'
                                >
                                    <NotebookIcon size={20} />
                                    مشاهده جزئیات
                                </SButton>
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
                    setDetailModal({
                        isShow: false
                    })
                }
                opened={detailModal.isShow}
                topSection={{
                    title: 'جزئیات شرکت',
                    description: 'جزئیات شرکت مورد نظر : ',
                    icon: <NotebookIcon size={20} />
                }}
            >
                <DetailCompanySystemModal data={detailModal.data} />
            </SModal>

            <SModal
                onClose={() =>
                    setEditModal({
                        isShow: false
                    })
                }
                opened={editModal.isShow}
                topSection={{
                    title: 'ویرایش دسته‌بندی شرکت',
                    description: 'مشخصات دسته‌بندی شرکت را وارد کنید:',
                    icon: <Edit3 size={20} />
                }}
            >
                <EditCompanySystemTypeModal
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
                    title: 'حدف دسته‌بندی شرکت',
                    description: 'با حذف دسته‌بندی شرکت، دسترسی های آن دسته‌بندی شرکت از دست خواهد رفت'
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteCompanySystemTypeModal
                    onClose={() => setDeleteModal({ isShow: false })}
                    data={deleteModal.data}
                />
            </SModal>
        </>
    )
}

export default CompanyTypesTable

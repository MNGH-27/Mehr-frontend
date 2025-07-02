'use client'

import { type FC, useMemo, useState } from 'react'
import { Edit3, MinusSquare, NotebookIcon } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'
import { type TParentCompanyWithChild } from '@core/types/api/company/parent-company-with-child'
import { type TModalStateType } from '@core/types/modal-state-types'

import {
    DeleteCompanyModal,
    DetailCompanyModal,
    EditCompanyModal,
    type ISingleCompanyTypesTableProps,
    TABLE_HEAD
} from './resources'

const SingleCompanyTypesTable: FC<ISingleCompanyTypesTableProps> = ({ data }) => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(() => getSinglePermission(PERMISSIONS(Routes.Companies())), [getSinglePermission])

    moment.loadPersian({ usePersianDigits: true })

    const [editModal, setEditModal] = useState<TModalStateType<TParentCompanyWithChild>>({ isShow: false })
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TParentCompanyWithChild>>({ isShow: false })
    const [detailModal, setDetailModal] = useState<TModalStateType<TParentCompanyWithChild>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.companyName} </STable.Td>
                        <STable.Td>{moment(data.fiscalYear).format('jYYYY/jMM/jDD')}</STable.Td>

                        <STable.Td>
                            <div className='flex items-center justify-between gap-x-2'>
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
                                    className='!w-fit'
                                >
                                    <Edit3 size={20} />
                                    ویرایش
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
                                    className='!w-fit'
                                >
                                    <MinusSquare size={20} />
                                    حذف
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
                    title: 'ویرایش شرکت',
                    description: 'مشخصات شرکت را وارد کنید:',
                    icon: <Edit3 size={20} />
                }}
            >
                <EditCompanyModal
                    onClose={() =>
                        setEditModal({
                            isShow: false
                        })
                    }
                    data={editModal.data}
                />
            </SModal>

            <SModal
                onClose={() =>
                    setDetailModal({
                        isShow: false
                    })
                }
                opened={detailModal.isShow}
                topSection={{
                    title: 'جزئیات شرکت',
                    description: 'جزئیات شرکت مورد نظر:',
                    icon: <NotebookIcon size={20} />
                }}
            >
                <DetailCompanyModal data={detailModal.data} />
            </SModal>

            <SModal
                topSection={{
                    title: 'حذف شرکت',
                    description: 'با حذف شرکت، دسترسی های آن شرکت از دست خواهد رفت'
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteCompanyModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>
        </>
    )
}

export default SingleCompanyTypesTable

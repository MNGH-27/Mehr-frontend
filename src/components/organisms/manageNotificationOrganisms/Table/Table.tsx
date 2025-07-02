'use client'

import { type FC, useMemo, useState } from 'react'
import { NotebookText, Trash } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'
import { type TNewsType } from '@core/types/api/news/news'
import { type TModalStateType } from '@core/types/modal-state-types'

import {
    DeleteNotificationModal,
    DetailNotificationModal,
    type IManageNotificationTableProps,
    TABLE_HEAD
} from './resources'

const ManageNotificationTable: FC<IManageNotificationTableProps> = ({ data }) => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(
        () => getSinglePermission(PERMISSIONS(Routes.ManageNotification())),
        [getSinglePermission]
    )

    const [deleteModal, setDeleteModal] = useState<TModalStateType<TNewsType>>({
        isShow: false
    })
    const [detailModal, setDetailModal] = useState<TModalStateType<TNewsType>>({
        isShow: false
    })

    return (
        <>
            <div className='grid'>
                <STable TABLE_HEAD={TABLE_HEAD}>
                    {data?.map((data, index) => (
                        <STable.Tr index={index} key={index}>
                            <STable.Td>{index + 1}</STable.Td>
                            <STable.Td>{data.title} </STable.Td>
                            <STable.Td>{data.subTitle} </STable.Td>
                            <STable.Td>{data.titleSystemType} </STable.Td>
                            <STable.Td>{moment(data.createAt).format('jYYYY/jMM/jDD')} </STable.Td>
                            <STable.Td>
                                <div className='flex items-center justify-center gap-x-1'>
                                    <SButton
                                        disabled={!permission || !permission.lstAccessCodes.includes(4)}
                                        onClick={() =>
                                            setDeleteModal({
                                                isShow: true,
                                                data
                                            })
                                        }
                                        size='None'
                                        variant='TextPrimary'
                                    >
                                        حذف
                                        <Trash size={20} />
                                    </SButton>
                                    <SButton
                                        onClick={() =>
                                            setDetailModal({
                                                isShow: true,
                                                data
                                            })
                                        }
                                        size='None'
                                        variant='TextSecondary'
                                    >
                                        جزئیات
                                        <NotebookText size={20} />
                                    </SButton>
                                </div>
                            </STable.Td>
                        </STable.Tr>
                    ))}
                </STable>
            </div>

            <SModal
                opened={deleteModal.isShow}
                onClose={() =>
                    setDeleteModal({
                        isShow: false
                    })
                }
                topSection={{
                    title: 'حذف اعلان',
                    description: 'با حذف اعلان دسترسی به این اعلان از دست خواهد رفت',
                    icon: <Trash />
                }}
            >
                <DeleteNotificationModal
                    onClose={() =>
                        setDeleteModal({
                            isShow: false
                        })
                    }
                    data={deleteModal.data}
                />
            </SModal>

            <SModal
                opened={detailModal.isShow}
                onClose={() =>
                    setDetailModal({
                        isShow: false
                    })
                }
                topSection={{
                    title: 'جزئیات اعلان',
                    description: 'مشاهده جزئیات اعلان',
                    icon: <NotebookText />
                }}
            >
                <DetailNotificationModal
                    onClose={() =>
                        setDetailModal({
                            isShow: false
                        })
                    }
                    data={detailModal.data}
                />
            </SModal>
        </>
    )
}

export default ManageNotificationTable

'use client'

import { type FC, useState } from 'react'
import { MinusSquare } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TReportItemType } from '@core/types/api/report.type'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteReportModal, type ICreateReportTableProps, TABLE_HEAD } from './resources'

const CreateReportTable: FC<ICreateReportTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TReportItemType>>({
        isShow: false
    })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.title} </STable.Td>
                        <STable.Td>{data.description ?? '-'}</STable.Td>
                        <STable.Td>{data.typeTitle}</STable.Td>
                        <STable.Td>
                            <SButton
                                onClick={() =>
                                    setDeleteModal({
                                        isShow: true,
                                        data
                                    })
                                }
                                variant='TextError'
                                size='None'
                            >
                                حذف گزارش
                                <MinusSquare size={16} />
                            </SButton>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>
            <SModal
                topSection={{
                    title: `حذف گذارش (${deleteModal.data?.title})`,
                    description: 'با حذف گذارش، دسترسی های آن گذارش از دست خواهد رفت',
                    icon: <MinusSquare size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteReportModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>
        </>
    )
}

export default CreateReportTable

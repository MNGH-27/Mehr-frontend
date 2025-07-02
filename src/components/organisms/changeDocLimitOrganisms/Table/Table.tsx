'use client'

import { type FC, useState } from 'react'
import { Trash } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TModalStateType } from '@core/types/modal-state-types'
import { type TCriticalAny } from '@core/types/type-any'

import { DeleteChangeDocLimitModal, type IChangeDocLimitTableProps, TABLE_HEAD } from './resources'

const ChangeDocLimitTable: FC<IChangeDocLimitTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TCriticalAny>>({
        isShow: false
    })
    return (
        <>
            <div className='grid'>
                <STable TABLE_HEAD={TABLE_HEAD}>
                    {data?.map((data, index) => (
                        <STable.Tr index={index} key={index}>
                            <STable.Td>{index + 1}</STable.Td>
                            <STable.Td>{data.companyName} </STable.Td>
                            <STable.Td>{data.systemTypeName}</STable.Td>
                            <STable.Td>{data.dayLimit}</STable.Td>
                            <STable.Td>
                                <SButton
                                    onClick={() =>
                                        setDeleteModal({
                                            isShow: true,
                                            data
                                        })
                                    }
                                    size='None'
                                    variant='TextPrimary'
                                >
                                    <Trash size={20} />
                                    حذف
                                </SButton>
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
                    title: 'تغییر محدودیت زمانی برای انواع سند برای شرکت ها',
                    description: 'با حذف فرصت اضافه دسترسی های آن نوع شرکت از دست خواهد رفت',
                    icon: <Trash />
                }}
            >
                <DeleteChangeDocLimitModal
                    onClose={() =>
                        setDeleteModal({
                            isShow: false
                        })
                    }
                    data={deleteModal.data}
                />
            </SModal>
        </>
    )
}

export default ChangeDocLimitTable

'use client'

import { type FC, useState } from 'react'
import { Trash } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TModalStateType } from '@core/types/modal-state-types'
import { type TCriticalAny } from '@core/types/type-any'

import { type IExceptionYearsTableProps, TABLE_HEAD } from './resources'
import DeleteExceptionYearsModal from './resources/components/DeleteExceptionYearsModal/DeleteExceptionYearsModal'

const ExceptionYearsTable: FC<IExceptionYearsTableProps> = ({ data }) => {
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
                            <STable.Td>{data.exceptionYear} </STable.Td>
                            {/* <STable.Td>{data.submitDate}</STable.Td> */}
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
                                    حذف
                                    <Trash size={20} />
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
                    title: 'حذف سال های استثنا برای آپلود گزارش',
                    description: 'با حذف سال های استثنا برای آپلود گزارش شرکت ها فرصت آپلود را از دست خواهد رفت',
                    icon: <Trash />
                }}
            >
                <DeleteExceptionYearsModal
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

export default ExceptionYearsTable

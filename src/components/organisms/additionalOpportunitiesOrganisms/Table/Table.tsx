'use client'

import { type FC, useState } from 'react'
import { Trash } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TModalStateType } from '@core/types/modal-state-types'
import { type TCriticalAny } from '@core/types/type-any'

import { DeleteAdditionalOpportunitiesModal, type IAdditionalOpportunitiesTableProps, TABLE_HEAD } from './resources'

const AdditionalOpportunitiesTable: FC<IAdditionalOpportunitiesTableProps> = ({ data }) => {
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
                            <STable.Td>{moment(data.dateTimeLimit).format('jYYYY/jMM/jDD')}</STable.Td>
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
                    title: 'حذف فرصت اضافه برای شرکت ها',
                    description: 'با حذف فرصت اضافه دسترسی های آن نوع شرکت از دست خواهد رفت',
                    icon: <Trash />
                }}
            >
                <DeleteAdditionalOpportunitiesModal
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

export default AdditionalOpportunitiesTable

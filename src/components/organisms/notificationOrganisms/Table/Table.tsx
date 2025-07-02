'use client'

import { type FC, useState } from 'react'
import { NotebookText } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TNewsType } from '@core/types/api/news/news'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DetailNotificationModal, type INotificationTableProps, TABLE_HEAD } from './resources'

const NotificationTable: FC<INotificationTableProps> = ({ data }) => {
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
                            </STable.Td>
                        </STable.Tr>
                    ))}
                </STable>
            </div>

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

export default NotificationTable

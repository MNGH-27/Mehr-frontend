'use client'

import { type FC, useState } from 'react'
import { NotepadTextIcon } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TReportArchiveType } from '@core/types/api/report/report-archive'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DetailReportModal, type IDocumentArchiveTableProps, TABLE_HEAD } from './resources'

const DocumentArchiveTable: FC<IDocumentArchiveTableProps> = ({ data }) => {
    const [detailModal, setDetailModal] = useState<TModalStateType<TReportArchiveType>>({
        isShow: false
    })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.firstName + ' ' + data.lastName} </STable.Td>
                        <STable.Td>{data.reportName}</STable.Td>
                        <STable.Td
                            className={`${data?.finalStatus === 1 ? '!text-green-700' : data?.finalStatus === 2 ? '!text-red-700' : '!text-secondary-800'}`}
                        >
                            {data.titleFinalStatus}
                        </STable.Td>
                        <STable.Td>
                            {data.dayLimitDateTime ? moment(data.dayLimitDateTime).format('jYYYY/jMM/jDD') : '-'}
                        </STable.Td>
                        <STable.Td>{data.companyName}</STable.Td>
                        <STable.Td>{data.titleReportType}</STable.Td>

                        <STable.Td>
                            <SButton
                                variant='TextPrimary'
                                size='SM'
                                onClick={() => {
                                    setDetailModal({
                                        isShow: true,
                                        data
                                    })
                                }}
                            >
                                <NotepadTextIcon />
                                مشاهده جزئیات
                            </SButton>
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
                    description: 'مشاهده جزئیات گزارش آپلود شده',
                    title: 'جزئیات گزارش',
                    icon: <NotepadTextIcon />
                }}
            >
                <DetailReportModal data={detailModal.data} />
            </SModal>
        </>
    )
}

export default DocumentArchiveTable

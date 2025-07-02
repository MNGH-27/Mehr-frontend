'use client'

import { type FC, useState } from 'react'
import { NotepadTextIcon, TrendingUpDown } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import MONTH_ENUM from '@core/enums/dummy-enum/dummy-enum.enum'
import { type TKartableReportType } from '@core/types/api/report/kartable-report'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DetailReportModal, DetermineStatusModal, type IReportCartableTableProps, TABLE_HEAD } from './resources'

const ReportCartableTable: FC<IReportCartableTableProps> = ({ data }) => {
    const [determine, setDetermine] = useState<TModalStateType<TKartableReportType>>({ isShow: false })
    const [detailModal, setDetailModal] = useState<TModalStateType<TKartableReportType>>({
        isShow: false
    })
    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.firstName + ' ' + data.lastName} </STable.Td>
                        <STable.Td>{data.companyName}</STable.Td>
                        <STable.Td>
                            {data.reportName}{' '}
                            {((data.month !== 0 && data.month !== null) ||
                                (data.timeYear !== 0 && data.timeYear !== null)) && (
                                <>
                                    ({data.timeYear !== 0 && data.timeYear !== null && data.timeYear}{' '}
                                    {data.month !== 0 &&
                                        data.month !== null &&
                                        MONTH_ENUM[data.month.toString() as keyof typeof MONTH_ENUM]}{' '}
                                    )
                                </>
                            )}
                        </STable.Td>
                        <STable.Td>{data.titleReportType}</STable.Td>
                        <STable.Td>{moment(data.createAt).format('jYYYY/jMM/jDD')}</STable.Td>
                        <STable.Td>
                            {data.modifyDateTime !== null ? moment(data.modifyDateTime).format('jYYYY/jMM/jDD') : '-'}
                        </STable.Td>
                        <STable.Td
                            className={`${data?.finalStatus === 1 ? '!text-green-700' : data?.finalStatus === 2 ? '!text-red-700' : '!text-secondary-800'}`}
                        >
                            {data.titleFinalStatus}
                        </STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-2'>
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
                                <SButton
                                    onClick={() => {
                                        setDetermine({
                                            isShow: true,
                                            data
                                        })
                                    }}
                                    size='None'
                                    variant='TextSecondary'
                                >
                                    <TrendingUpDown size={20} />
                                    تعیین وضعیت
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
                    description: 'مشاهده جزئیات گزارش آپلود شده',
                    title: 'جزئیات گزارش',
                    icon: <NotepadTextIcon />
                }}
            >
                <DetailReportModal data={detailModal.data} />
            </SModal>

            <SModal
                onClose={() =>
                    setDetermine({
                        isShow: false
                    })
                }
                opened={determine.isShow}
                topSection={{
                    title: `تعیین وضعیت گزارش شرکت {${determine.data?.companyName ?? ''}}`,
                    description: 'با بررسی گزارش آپلود شده میتواند وضعیت آن را تغییر دهید'
                }}
            >
                <DetermineStatusModal
                    onClose={() =>
                        setDetermine({
                            isShow: false
                        })
                    }
                    data={determine?.data}
                />
            </SModal>
        </>
    )
}

export default ReportCartableTable

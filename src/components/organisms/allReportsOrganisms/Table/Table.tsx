'use client'

import { type FC, useState } from 'react'
import { NotepadTextIcon, PenBox } from 'lucide-react'
import moment from 'moment-jalaali'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import MONTH_ENUM from '@core/enums/dummy-enum/dummy-enum.enum'
import { type TCompanyReportByUserIdType } from '@core/types/api/report/company-report-by-user-id'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DetailReportModal, DetermineStatusModal, type IAllReportsTableProps, TABLE_HEAD } from './resources'

const AllReportsTable: FC<IAllReportsTableProps> = ({ data }) => {
    const [detailModal, setDetailModal] = useState<TModalStateType<TCompanyReportByUserIdType>>({
        isShow: false
    })
    const [determineModal, setDetermineModal] = useState<TModalStateType<TCompanyReportByUserIdType>>({
        isShow: false
    })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.reportName} </STable.Td>
                        <STable.Td>{data.companyName}</STable.Td>
                        <STable.Td>{data.titleReportType}</STable.Td>
                        <STable.Td>{data.titleTimePeriod}</STable.Td>
                        <STable.Td
                            className={`${data?.comReportStatus === 1 ? '!text-green-700' : data?.comReportStatus === 2 ? '!text-red-700' : '!text-secondary-800'}`}
                        >
                            {data.titleComReportStatus}
                        </STable.Td>
                        <STable.Td>{data.timeYear}</STable.Td>
                        <STable.Td>
                            {data.month !== null && data.month !== 0
                                ? MONTH_ENUM[data.month?.toString() as keyof typeof MONTH_ENUM]
                                : '-'}{' '}
                        </STable.Td>
                        <STable.Td>{moment(data.createAt).format('jYYYY/jMM/jDD')} </STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-2'>
                                <SButton
                                    variant='TextSecondary'
                                    size='SM'
                                    onClick={() => {
                                        setDetailModal({
                                            isShow: true,
                                            data
                                        })
                                    }}
                                >
                                    مشاهده جزئیات
                                    <NotepadTextIcon />
                                </SButton>
                                <SButton
                                    variant='TextPrimary'
                                    size='SM'
                                    disabled={data.isEdite === false}
                                    onClick={() => {
                                        if (data.isEdite)
                                            setDetermineModal({
                                                isShow: true,
                                                data
                                            })
                                    }}
                                >
                                    ویرایش فرم
                                    <PenBox />
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
                    setDetermineModal({
                        isShow: false
                    })
                }
                opened={determineModal.isShow}
                topSection={{
                    description: 'ویرایش گزارش آپلود شده',
                    title: 'ویرایش گزارش',
                    icon: <PenBox />
                }}
            >
                <DetermineStatusModal
                    onClose={() =>
                        setDetermineModal({
                            isShow: false
                        })
                    }
                    data={determineModal.data}
                />
            </SModal>
        </>
    )
}

export default AllReportsTable

'use client'

import { type FC, useState } from 'react'
import { FileLineChartIcon } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TReportDataItemType } from '@core/types/api/report.type'
import { type TModalStateType } from '@core/types/modal-state-types'

import { FillFromModal, type IFillReportTableProps, TABLE_HEAD } from './resources'

const FillReportTable: FC<IFillReportTableProps> = ({ data }) => {
    const [fillFormModal, setFillFormModal] = useState<TModalStateType<TReportDataItemType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.userFullName} </STable.Td>
                        <STable.Td>{data.reportItemTitle}</STable.Td>
                        <STable.Td>{data.organName}</STable.Td>
                        <STable.Td>{data?.answerValue}</STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center'>
                                <SButton
                                    onClick={() => {
                                        setFillFormModal({
                                            isShow: true,
                                            data
                                        })
                                    }}
                                    variant='TextPrimary'
                                    size='None'
                                >
                                    <FileLineChartIcon />
                                    پر کردن سوالات
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                topSection={{
                    title: `پر کردن گزارش (${fillFormModal.data?.reportItemTitle})`,
                    description: 'لطفا با دقت اطلاعات مربوط به گزارش را پر کنید',
                    icon: <FileLineChartIcon size={20} />
                }}
                onClose={() => setFillFormModal({ isShow: false })}
                opened={fillFormModal.isShow}
            >
                <FillFromModal onClose={() => setFillFormModal({ isShow: false })} data={fillFormModal.data} />
            </SModal>
        </>
    )
}

export default FillReportTable

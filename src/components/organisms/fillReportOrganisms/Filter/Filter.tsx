'use client'

import { ChartArea, ChartAreaIcon } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'
import { SSelect } from '@atoms/SSelect'

import { useGetAllReportItem } from '@core/services/hooks/report/useGetAllReportItem'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { FillFromModal } from './resources'

const FillReportFilter = () => {
    const [isShowAddModal, { close: onCloseAddModal, open: onOpenAddModal }] = useDisclosure(false)

    const [query, setQuery] = useQueryParams({ ReportItemId: StringParam, page: NumberParam })

    const { data: allReportItems, isLoading: isLoadingAllReportItems } = useGetAllReportItem({})

    return (
        <>
            <div className='flex md:flex-row flex-col items-start justify-center gap-5'>
                <SSelect
                    leftSection={<ChartAreaIcon />}
                    onChange={(value) => {
                        setQuery({
                            page: 1,
                            ReportItemId: value ?? ''
                        })
                    }}
                    data={convertDataSelectList(allReportItems?.data)}
                    isLoading={isLoadingAllReportItems}
                    value={query.ReportItemId ?? ''}
                    placeholder='نوع گزارش برای فیلتر را مشخص کنید'
                />
                <div className='flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-5 whitespace-nowrap w-full lg:w-fit'>
                    <SButton onClick={onOpenAddModal} size='M' variant='FilledPrimary'>
                        <ChartArea />
                        پر کردن گزارش
                    </SButton>
                </div>
            </div>

            <SModal
                onClose={onCloseAddModal}
                opened={isShowAddModal}
                topSection={{
                    title: 'ایجاد گزارش',
                    description: 'مشخصات گزارش جدید را وارد کنید:',
                    icon: <ChartArea />
                }}
            >
                <FillFromModal onClose={onCloseAddModal} />
            </SModal>
        </>
    )
}

export default FillReportFilter

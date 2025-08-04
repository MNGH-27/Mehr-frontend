'use client'

import { useState } from 'react'
import { ChartArea, ChartAreaIcon } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'
import { SSelect } from '@atoms/SSelect'

import { useGetAllReportType } from '@core/services/hooks/report/useGetAllReportType'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { AddReportModal } from './resources'

const CreateReportFilter = () => {
    const [isShowAddModal, { close: onCloseAddModal, open: onOpenAddModal }] = useDisclosure(false)

    const [query, setQuery] = useQueryParams({
        name: StringParam,
        type: StringParam,
        page: NumberParam
    })
    const [Search, setSearch] = useState(query.name ?? '')

    const { data: reportType, isLoading: isLoadingReportType } = useGetAllReportType({})

    const onChangeFilter = (value: string | null) => {
        setQuery({ name: value, page: 1 })
    }

    return (
        <div className='flex flex-col items-start justify-center gap-y-5'>
            <div className='w-full flex items-center justify-center gap-x-5'>
                <SSearchWithDelay
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    onDelayChange={onChangeFilter}
                />
                <SSelect
                    leftSection={<ChartAreaIcon />}
                    onChange={(value) => {
                        setQuery({
                            page: 1,
                            type: value ?? ''
                        })
                    }}
                    data={convertDataSelectList(reportType?.data.filter((item) => item.id !== 0))}
                    isLoading={isLoadingReportType}
                    value={query.type ?? ''}
                    placeholder='نوع گزارش برای فیلتر را مشخص کنید'
                />
            </div>
            <SButton onClick={onOpenAddModal} size='SM' variant='FilledPrimary'>
                <ChartArea />
                افزودن گزارش
            </SButton>
            <SModal
                onClose={onCloseAddModal}
                opened={isShowAddModal}
                topSection={{
                    title: 'ایجاد گزارش',
                    description: 'مشخصات گزارش جدید را وارد کنید:',
                    icon: <ChartArea />
                }}
            >
                <AddReportModal onClose={onCloseAddModal} />
            </SModal>
        </div>
    )
}

export default CreateReportFilter

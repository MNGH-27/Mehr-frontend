'use client'

import { useState } from 'react'
import { ChartArea, Layers } from 'lucide-react'
import { StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SInputField } from '@molecules/SInputField'
import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'
import { SSelect } from '@atoms/SSelect'

import { useGetAllRegions } from '@core/services/hooks/basic-info/useGetAllRegions'
import { useGetAllState } from '@core/services/hooks/basic-info/useGetAllState'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { AddOrganModal } from './resources'

const CreateReportFilter = () => {
    const [isShowAddModal, { close: onCloseAddModal, open: onOpenAddModal }] = useDisclosure(false)

    const [query, setQuery] = useQueryParams({
        name: StringParam,
        stateId: StringParam,
        regionId: StringParam
    })
    const [Search, setSearch] = useState(query.name ?? '')

    const { data: statesList, isLoading: isLoadingAllState } = useGetAllState({})
    const { data: regionList, isLoading: isLoadingAllRegion } = useGetAllRegions({
        StateId: query.stateId ?? ''
    })

    const onChangeFilter = (value: string | null) => {
        setQuery({ name: value })
    }

    return (
        <div className='flex flex-col items-start justify-center gap-y-5'>
            <div className='w-full flex items-center justify-center gap-x-5'>
                <SSearchWithDelay
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    onDelayChange={onChangeFilter}
                />

                <div className='flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-5 whitespace-nowrap w-full lg:w-fit'>
                    <SButton onClick={onOpenAddModal} size='SM' variant='FilledPrimary'>
                        <ChartArea />
                        افزودن گزارش
                    </SButton>
                </div>
            </div>
            <div className='w-full flex items-center justify-center gap-x-5'>
                <SInputField label='استان' errors={{}} name={''}>
                    <SSelect
                        leftSection={<Layers />}
                        data={convertDataSelectList(statesList?.data)}
                        isLoading={isLoadingAllState}
                        onChange={(value) => {
                            setQuery({ ...query, stateId: value, regionId: undefined })
                        }}
                        value={query.stateId}
                        placeholder='استان را وارد کنید'
                    />
                </SInputField>
                <SInputField label='منطقه' errors={{}} name={''}>
                    <SSelect
                        leftSection={<Layers />}
                        data={convertDataSelectList(regionList?.data)}
                        isLoading={isLoadingAllRegion}
                        onChange={(value) => {
                            setQuery({ ...query, regionId: value })
                        }}
                        value={query.regionId}
                        placeholder='منطقه را وارد کنید'
                    />
                </SInputField>
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
                <AddOrganModal onClose={onCloseAddModal} />
            </SModal>
        </div>
    )
}

export default CreateReportFilter

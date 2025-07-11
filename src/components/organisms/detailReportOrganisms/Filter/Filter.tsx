'use client'

import { ChartArea, Layers } from 'lucide-react'
import { StringParam, useQueryParams } from 'use-query-params'

import { SInputField } from '@molecules/SInputField'

import { SSelect } from '@atoms/SSelect'

import { CHART_TYPE_LIST } from '@core/constants/dummy-data'
import { useGetAllRegions } from '@core/services/hooks/basic-info/useGetAllRegions'
import { useGetAllState } from '@core/services/hooks/basic-info/useGetAllState'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

const DetailReportFilter = () => {
    const [query, setQuery] = useQueryParams({
        stateId: StringParam,
        regionId: StringParam,
        'chart-type': StringParam
    })

    const { data: statesList, isLoading: isLoadingAllState } = useGetAllState({})
    const { data: regionList, isLoading: isLoadingAllRegion } = useGetAllRegions({
        StateId: query.stateId ?? ''
    })

    return (
        <div className='w-full grid sm:grid-cols-2 gap-5'>
            <SInputField label='استان' errors={{}} name={''}>
                <SSelect
                    leftSection={<Layers />}
                    data={convertDataSelectList(statesList?.data)}
                    isLoading={isLoadingAllState}
                    onChange={(value) => {
                        setQuery({ ...query, stateId: value, regionId: null })
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

            <SInputField className='!col-span-full' label='نوع نمودار' errors={{}} name={''}>
                <SSelect
                    leftSection={<ChartArea />}
                    data={CHART_TYPE_LIST}
                    onChange={(value) => {
                        setQuery({ ...query, 'chart-type': value })
                    }}
                    value={query['chart-type']}
                    placeholder='نوع نمودار را وارد کنید'
                />
            </SInputField>
        </div>
    )
}

export default DetailReportFilter

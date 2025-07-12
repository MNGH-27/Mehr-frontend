'use client'

import { Layers } from 'lucide-react'
import { StringParam, useQueryParams } from 'use-query-params'

import { SInputField } from '@molecules/SInputField'
import { STabs } from '@molecules/STabs'

import { SSelect } from '@atoms/SSelect'

import { useGetAllRegions } from '@core/services/hooks/basic-info/useGetAllRegions'
import { useGetAllState } from '@core/services/hooks/basic-info/useGetAllState'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

const TABS_LIST = [
    { value: '1', label: 'کشوری' },
    { value: '2', label: 'استانی' },
    { value: '3', label: 'منطقه ای' }
]

const DetailReportFilter = () => {
    const [query, setQuery] = useQueryParams({
        stateId: StringParam,
        regionId: StringParam,
        reportLevel: StringParam
    })

    const { data: statesList, isLoading: isLoadingAllState } = useGetAllState({})
    const { data: regionList, isLoading: isLoadingAllRegion } = useGetAllRegions({
        StateId: query.stateId ?? ''
    })

    return (
        <>
            <STabs
                value={query.reportLevel ?? '1'}
                onChange={(value) => setQuery({ ...query, reportLevel: value })}
                className={`w-full`}
            >
                {TABS_LIST.map((tab) => (
                    <STabs.Tab key={`tab-${tab.value}`} value={tab.value}>
                        {tab.label}
                    </STabs.Tab>
                ))}
            </STabs>
            {query.reportLevel && query?.reportLevel !== '1' && (
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
                            disabled={query.reportLevel === '2'}
                            value={query.regionId}
                            placeholder='منطقه را وارد کنید'
                        />
                    </SInputField>
                </div>
            )}
        </>
    )
}

export default DetailReportFilter

'use client'

import { ChartAreaIcon, Layers } from 'lucide-react'
import { StringParam, useQueryParams } from 'use-query-params'

import { SInputField } from '@molecules/SInputField'

import { SSelect } from '@atoms/SSelect'

import { useGetAllRegions } from '@core/services/hooks/basic-info/useGetAllRegions'
import { useGetAllState } from '@core/services/hooks/basic-info/useGetAllState'
import { useGetAllReportType } from '@core/services/hooks/report/useGetAllReportType'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

const DashboardFilter = () => {
    const [query, setQuery] = useQueryParams({
        ReportItemId: StringParam,
        stateId: StringParam,
        regionId: StringParam
    })

    const { data: allReportItems, isLoading: isLoadingAllReportItems } = useGetAllReportType({})
    const { data: statesList, isLoading: isLoadingAllState } = useGetAllState({})
    const { data: regionList, isLoading: isLoadingAllRegion } = useGetAllRegions({
        StateId: query.stateId ?? ''
    })
    return (
        <>
            <SSelect
                leftSection={<ChartAreaIcon />}
                onChange={(value) => {
                    setQuery({
                        ReportItemId: value ?? ''
                    })
                }}
                data={convertDataSelectList(allReportItems?.data.filter((item) => item.id !== 0))}
                isLoading={isLoadingAllReportItems}
                value={query.ReportItemId ?? ''}
                placeholder='نوع گزارش برای فیلتر را مشخص کنید'
            />
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
            </div>
        </>
    )
}

export default DashboardFilter

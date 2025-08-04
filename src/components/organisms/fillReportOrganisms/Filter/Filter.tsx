'use client'

import { ChartArea, ChartAreaIcon, Layers, Layers2 } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'
import { SSelect } from '@atoms/SSelect'

import { useGetAllRegions } from '@core/services/hooks/basic-info/useGetAllRegions'
import { useGetAllState } from '@core/services/hooks/basic-info/useGetAllState'
import { useGetAllReportGradeType } from '@core/services/hooks/report/useGetAllReportGradeType'
import { useGetAllReportType } from '@core/services/hooks/report/useGetAllReportType'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

import { FillFromModal } from './resources'

const FillReportFilter = () => {
    const [isShowAddModal, { close: onCloseAddModal, open: onOpenAddModal }] = useDisclosure(false)

    const [query, setQuery] = useQueryParams({
        ReportItemId: StringParam,
        page: NumberParam,
        stateId: StringParam,
        regionId: StringParam,
        GradeId:StringParam
    })

    const { data: allReportItems, isLoading: isLoadingAllReportItems } = useGetAllReportType({})
    const { data: statesList, isLoading: isLoadingAllState } = useGetAllState({})
    const { data: regionList, isLoading: isLoadingAllRegion } = useGetAllRegions({
        StateId: query.stateId ?? ''
    })
    const { data: reportGrade, isLoading: isLoadingReportGrade } = useGetAllReportGradeType({})

    return (
        <>
            <div className='flex md:flex-row flex-col items-center justify-center gap-5'>
                <SSelect
                    leftSection={<ChartAreaIcon />}
                    onChange={(value) => {
                        setQuery({
                            page: 1,
                            ReportItemId: value ?? ''
                        })
                    }}
                    data={convertDataSelectList(allReportItems?.data.filter((item) => item.id !== 0))}
                    isLoading={isLoadingAllReportItems}
                    value={query.ReportItemId ?? ''}
                    placeholder='نوع گزارش برای فیلتر را مشخص کنید'
                />
                    <SInputField errors={{}} name={''} >
                        <SSelect
                            data={convertDataSelectList(reportGrade?.data.filter((item) => item.id !== 0))}
                            isLoading={isLoadingReportGrade}
                            leftSection={<Layers2 />}
                            onChange={(value) => {
                                setQuery({ ...query, GradeId: value })
                            }}
                            value={query.GradeId}
                            placeholder='مقطع را انتخاب کنید'
                        />
                    </SInputField>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-5 whitespace-nowrap w-full lg:w-fit'>
                    <SButton onClick={onOpenAddModal} size='M' variant='FilledPrimary'>
                        <ChartArea />
                        پر کردن گزارش
                    </SButton>
                </div>
            </div>
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

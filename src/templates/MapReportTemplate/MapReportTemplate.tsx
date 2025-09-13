'use client'

import { useState } from 'react'

import { FetchingBoundary } from '@partials/boundaries/Fetching'

import { ClusterMapChart, MapReportInfo } from '@organisms/mapReportOrganisms'

import { useGetShakhesReport } from '@core/services/hooks/report/useGetShakhesReport'

const MapReportTemplate = () => {
    const [selectedProvince, setSelectedProvince] = useState<null | number>(null)

    const {
        data: allShakhesReport,
        isLoading: isLoadingAllShakhesReport,
        isError: isErrorAllShakhesReport
    } = useGetShakhesReport({})

    const selectCityHandler = (province: number) => {
        setSelectedProvince(province)
    }

    return (
        <FetchingBoundary isError={isErrorAllShakhesReport} isLoading={isLoadingAllShakhesReport}>
            <MapReportInfo selectedProvince={selectedProvince} data={allShakhesReport?.data} />
            <ClusterMapChart data={allShakhesReport?.data.shakhesColor ?? []} selectCityHandler={selectCityHandler} />
        </FetchingBoundary>
    )
}

export default MapReportTemplate

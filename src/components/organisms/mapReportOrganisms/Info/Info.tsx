import React from 'react'

import { NotFoundBoundary } from '@partials/boundaries/NotFound'

import { useGetShakhesReport } from '@core/services/hooks/report/useGetShakhesReport'
import { type TShakhesReportItemType } from '@core/types/api/report.type'

interface MapReportInfoProps {
    selectedProvince: number | null
    data?: TShakhesReportItemType
}

const MapReportInfo = ({ data }: MapReportInfoProps) => {
    useGetShakhesReport({})

    if (data == undefined) return <NotFoundBoundary className='!h-fit' text='داده ای برای نمایش یافت نشد' />

    return <div>Info</div>
}

export default MapReportInfo

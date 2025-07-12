import { type Dispatch, type SetStateAction } from 'react'

import { type TReportItemType } from '@core/types/api/report.type'

interface IDashboardTableProps {
    data?: TReportItemType[]
    selectedReport: TReportItemType | undefined
    setSelectedReport: Dispatch<SetStateAction<TReportItemType | undefined>>
}

export default IDashboardTableProps

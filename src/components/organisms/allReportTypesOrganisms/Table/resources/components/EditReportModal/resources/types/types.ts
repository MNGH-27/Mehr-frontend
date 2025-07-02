import { type TReportType } from '@core/types/api/report/report'
import { type TCriticalAny } from '@core/types/type-any'

interface IEditReportModalProps {
    onClose: () => void
    data?: TReportType
}

type TEditReportForm = {
    title: string
    reportType: string
    documentFormatId?: string
    dayLimit: string
    timePeriod: string
    companyTypeId?: string[]
    companyId?: string | null
    documentId?: TCriticalAny
}

export type { IEditReportModalProps, TEditReportForm }

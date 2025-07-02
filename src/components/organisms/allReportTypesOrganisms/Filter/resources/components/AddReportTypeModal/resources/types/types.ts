import { type TCriticalAny } from '@core/types/type-any'

interface IAddReportTypeModalProps {
    onClose: () => void
}

type TAddReportTypeForm = {
    title: string
    reportType: string
    documentFormatId?: string
    dayLimit: string
    timePeriod: string
    companyTypeId?: string[]
    companyId?: string | null
    documentId?: TCriticalAny
}

export type { IAddReportTypeModalProps, TAddReportTypeForm }

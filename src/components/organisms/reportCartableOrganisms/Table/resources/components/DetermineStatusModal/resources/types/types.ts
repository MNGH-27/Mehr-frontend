import { type TKartableReportType } from '@core/types/api/report/kartable-report'

interface IDetermineStatusModalProps {
    onClose: () => void
    data?: TKartableReportType
}

type TDetermineModalForm = {
    status: string
    message?: string
    exteraTime?: Date
}

export type { IDetermineStatusModalProps, TDetermineModalForm }

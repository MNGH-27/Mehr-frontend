import { type TCompanyReportByUserIdType } from '@core/types/api/report/company-report-by-user-id'

interface IDetermineStatusModalProps {
    onClose: () => void
    data?: TCompanyReportByUserIdType
}

type TDetermineModalForm = {
    status: string
    message: string
    title: string
}

export type { IDetermineStatusModalProps, TDetermineModalForm }

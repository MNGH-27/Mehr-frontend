import { type TReportItemType } from '@core/types/api/report.type'

interface IAddReportModalProps {
    onClose: () => void
    data?: TReportItemType
}

type TAddReportForm = {
    title: string
    description: string
    reportItemType: string
}

export type { IAddReportModalProps, TAddReportForm }

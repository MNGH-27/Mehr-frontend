import { type TReportByRegionItemType } from '@core/types/api/report.type'

interface IAddReportModalProps {
    onClose: () => void
    data?: TReportByRegionItemType
}

type TAddReportForm = {
    title: string
    description: string
    reportItemType: string
}

export type { IAddReportModalProps, TAddReportForm }

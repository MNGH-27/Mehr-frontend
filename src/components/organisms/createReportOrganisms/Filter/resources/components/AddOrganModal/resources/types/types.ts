interface IAddReportModalProps {
    onClose: () => void
}

type TAddReportForm = {
    title: string
    description: string
    reportItemType: string
    reportChart: string
}

export type { IAddReportModalProps, TAddReportForm }

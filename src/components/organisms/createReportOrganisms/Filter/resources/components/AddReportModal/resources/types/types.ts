interface IAddReportModalProps {
    onClose: () => void
}

type TAddReportForm = {
    title: string
    description: string
    reportType: string
    reportChart: string
    reportGradeType: string
}

export type { IAddReportModalProps, TAddReportForm }

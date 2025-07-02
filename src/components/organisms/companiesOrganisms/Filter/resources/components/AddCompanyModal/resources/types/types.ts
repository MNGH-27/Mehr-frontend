interface IAddCompanyModalProps {
    onClose: () => void
}

type TAddCompanyForm = {
    companyName: string
    systemTypeId: string
    fiscalYear: Date
    isForeigner: boolean
}

export type { IAddCompanyModalProps, TAddCompanyForm }

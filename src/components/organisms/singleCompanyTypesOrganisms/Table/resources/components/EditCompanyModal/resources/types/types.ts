import { type TParentCompanyWithChild } from '@core/types/api/company/parent-company-with-child'

interface IEditCompanyModalProps {
    onClose: () => void
    data?: TParentCompanyWithChild
}

type TEditCompanyForm = {
    companyName: string
    systemTypeId: string
    fiscalYear: Date
    isForeigner: boolean
}

export type { IEditCompanyModalProps, TEditCompanyForm }

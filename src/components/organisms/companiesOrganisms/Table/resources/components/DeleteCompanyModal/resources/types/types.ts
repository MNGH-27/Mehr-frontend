import { type TParentCompanyWithChild } from '@core/types/api/company/parent-company-with-child'

interface IDeleteCompanyModalProps {
    onClose: () => void
    data?: TParentCompanyWithChild
}

export type { IDeleteCompanyModalProps }

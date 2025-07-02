import { type TCompanySystemTypeWithChildType } from '@core/types/api/company/company-system-type-with-child'

interface IEditCompanySystemTypeModalProps {
    onClose: () => void
    data?: TCompanySystemTypeWithChildType
}

type TEditCompanySystemTypeForm = { name: string }

export type { IEditCompanySystemTypeModalProps, TEditCompanySystemTypeForm }

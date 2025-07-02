import { type TCompanySystemTypeType } from '@core/types/api/company/company-system-type'

interface IEditNotificationSystemTypeModalProps {
    onClose: () => void
    data?: TCompanySystemTypeType
}

type TEditNotificationSystemTypeForm = { name: string }

export type { IEditNotificationSystemTypeModalProps, TEditNotificationSystemTypeForm }

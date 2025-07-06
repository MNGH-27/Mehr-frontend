import { type TOrganListItemType } from '@core/types/api/organ.types'

interface IEditOrganModalProps {
    onClose: () => void
    data?: TOrganListItemType
}

type TEditUserForm = {
    organName: string
    fullAddress: string
    phoneNumber: string
    code: string
}

export type { IEditOrganModalProps, TEditUserForm }

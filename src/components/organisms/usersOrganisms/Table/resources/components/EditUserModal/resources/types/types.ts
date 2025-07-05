import { type TUserListItemType } from '@core/types/api/users.types'

interface IEditUserModalProps {
    onClose: () => void
    data?: TUserListItemType
}

type TEditUserForm = {
    firstName: string
    lastName: string
    natId: string
    phoneNumber: string
    password?: string
    confirmPassword?: string
    birthDate: Date
}

export type { IEditUserModalProps, TEditUserForm }

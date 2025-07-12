import { type TUserDetailType } from '@core/types/api/users.types'

interface IEditProfileModalProps {
    onClose: () => void
    data?: TUserDetailType
}

type TUserFormTypeForm = {
    firstName: string
    lastName: string
    phoneNumber: string
    nationalCode: string
    email: string
    company: string
    role: string
}

export type { IEditProfileModalProps, TUserFormTypeForm }

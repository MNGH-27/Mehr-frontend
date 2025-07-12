import { type TUserDataType } from '@core/types/api/user/user-data'

interface IEditProfileModalProps {
    onClose: () => void
    data?: TUserDataType
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

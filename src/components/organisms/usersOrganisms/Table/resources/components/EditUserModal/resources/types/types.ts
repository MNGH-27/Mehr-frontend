import { type TUserType } from '@core/types/api/user/user'

interface IEditUserModalProps {
    onClose: () => void
    data?: TUserType
}

type TEditUserForm = {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    companyId: string
    nationalCode: string
    role: string
    roleId?: string | null
    password?: string
    confirmPassword?: string
}

export type { IEditUserModalProps, TEditUserForm }

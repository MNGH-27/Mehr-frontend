interface IAddUserModalProps {
    onClose: () => void
}

type TAddUserForm = {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    companyId: string
    nationalCode: string
    role: string
    roleId?: string | null
    password: string
    confirmPassword: string
}

export type { IAddUserModalProps, TAddUserForm }

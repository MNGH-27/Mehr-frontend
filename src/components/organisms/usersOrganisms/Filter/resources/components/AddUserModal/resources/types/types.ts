interface IAddUserModalProps {
    onClose: () => void
}

type TAddUserForm = {
    firstName: string
    lastName: string
    natId: string
    phoneNumber: string
    password: string
    confirmPassword: string
    userName: string
    birthDate: Date
}

export type { IAddUserModalProps, TAddUserForm }

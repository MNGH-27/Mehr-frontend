interface IAddRoleModalProps {
    onClose: () => void
}

type TAddRoleForm = {
    roleName: string
    description: string
    organTypes: string[]
}

export type { IAddRoleModalProps, TAddRoleForm }

interface IAddOrganRoleModalProps {
    onClose: () => void
}

type TAddOrganRoleForm = {
    organName: string
    fullAddress: string
    phoneNumber: string
    code: string
    regionId: string
    stateId: string
    organLevel: string
    organTypeId: string
}

export type { IAddOrganRoleModalProps, TAddOrganRoleForm }

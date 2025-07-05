interface IAddOrganModalProps {
    onClose: () => void
}

type TAddOrganForm = {
    organName: string
    fullAddress: string
    phoneNumber: string
    code: string
    regionId: string
    stateId: string
    organLevel: string
    organTypeId: string
}

export type { IAddOrganModalProps, TAddOrganForm }

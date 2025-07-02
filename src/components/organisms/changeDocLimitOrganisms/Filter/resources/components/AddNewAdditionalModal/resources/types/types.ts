interface IAddNewAdditionalModalModalProps {
    onClose: () => void
}

type TAddNewAdditionalModalForm = {
    companyId: string
    systemTypeId: string
    dayLimit: string
}

export type { IAddNewAdditionalModalModalProps, TAddNewAdditionalModalForm }

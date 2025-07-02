interface IAddNewAdditionalModalModalProps {
    onClose: () => void
}

type TAddNewAdditionalModalForm = {
    companyId: string
    systemTypeId: string
    dateTimeLimit: Date
}

export type { IAddNewAdditionalModalModalProps, TAddNewAdditionalModalForm }

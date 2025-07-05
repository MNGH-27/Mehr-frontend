import { type TIdNameType } from '@core/types/id-name/types'

interface IUpdateRoleModalProps {
    onClose: () => void
    data?: TIdNameType
}

type TUpdateRoleForm = {
    roleName: string
}

export type { IUpdateRoleModalProps, TUpdateRoleForm }

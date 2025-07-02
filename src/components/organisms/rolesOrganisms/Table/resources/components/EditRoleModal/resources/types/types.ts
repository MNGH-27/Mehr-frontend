import { type TRoleType } from '@core/types/api/user/role'

interface IEditRoleModalProps {
    onClose: () => void
    data?: TRoleType
}

type TEditRoleForm = { persianName: string }

export type { IEditRoleModalProps, TEditRoleForm }

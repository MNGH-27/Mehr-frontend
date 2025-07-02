import { type TUserType } from '@core/types/api/user/user'

interface IDeleteUserModalProps {
    onClose: () => void
    data?: TUserType
}

export type { IDeleteUserModalProps }

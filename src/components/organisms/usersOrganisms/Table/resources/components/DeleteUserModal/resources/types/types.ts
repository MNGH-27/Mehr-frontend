import { type TUserListItemType } from '@core/types/api/users.types'

interface IDeleteUserModalProps {
    onClose: () => void
    data?: TUserListItemType
}

export type { IDeleteUserModalProps }

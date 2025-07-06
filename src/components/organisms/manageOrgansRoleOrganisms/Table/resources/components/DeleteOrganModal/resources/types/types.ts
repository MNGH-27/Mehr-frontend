import { type TUserInOrganItemType } from '@core/types/api/users.types'

interface IDeleteOrganModalProps {
    onClose: () => void
    data?: TUserInOrganItemType
}

export type { IDeleteOrganModalProps }

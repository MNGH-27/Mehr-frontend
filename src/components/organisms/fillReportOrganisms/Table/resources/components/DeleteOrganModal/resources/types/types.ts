import { type TOrganListItemType } from '@core/types/api/organ.types'

interface IDeleteOrganModalProps {
    onClose: () => void
    data?: TOrganListItemType
}

export type { IDeleteOrganModalProps }

import { type TNewsType } from '@core/types/api/news/news'

interface IDetailNotificationModalProps {
    onClose: () => void
    data?: TNewsType
}

export type { IDetailNotificationModalProps }

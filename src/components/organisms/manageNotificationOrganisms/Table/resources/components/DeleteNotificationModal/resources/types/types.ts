import { type TNewsType } from '@core/types/api/news/news'

interface IDeleteNotificationModalProps {
    onClose: () => void
    data?: TNewsType
}

export type { IDeleteNotificationModalProps }

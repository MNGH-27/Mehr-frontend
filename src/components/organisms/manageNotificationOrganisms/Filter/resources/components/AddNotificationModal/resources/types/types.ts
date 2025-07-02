import { type TCriticalAny } from '@core/types/type-any'

interface IAddNotificationModalProps {
    onClose: () => void
}

type TAddNotificationForm = {
    title: string
    systemTypeId: string
    newsType: string
    subTitle: string
    description?: string
    documentId?: TCriticalAny
}

export type { IAddNotificationModalProps, TAddNotificationForm }

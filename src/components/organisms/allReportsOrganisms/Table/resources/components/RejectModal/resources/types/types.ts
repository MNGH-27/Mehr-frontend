import { type TCriticalAny } from '@core/types/type-any'

interface IRejectModalModalProps {
    onClose: () => void
}

type TRejectModalForm = {
    sendTime: string
    file: TCriticalAny
}

export type { IRejectModalModalProps, TRejectModalForm }

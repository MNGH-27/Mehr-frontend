import { type FC, useCallback } from 'react'
import { Info } from 'lucide-react'

interface ISingleNotifyProps {
    title: string
    type: 'error' | 'warning' | 'success'
}

const SingleNotify: FC<ISingleNotifyProps> = ({ title, type }) => {
    const notifyStyle = useCallback(
        () =>
            type === 'error'
                ? 'bg-error-extralight text-error'
                : type === 'success'
                  ? 'bg-success-extralight text-success'
                  : 'bg-primary-tinted-100 text-primary-tinted-900',
        [type]
    )

    return (
        <div
            className={`flex items-center justify-center gap-x-2 p-2 rounded-[8px] text-xs md:text-sm font-medium ${notifyStyle()}`}
        >
            <Info size={18} />
            {title}
        </div>
    )
}

export default SingleNotify

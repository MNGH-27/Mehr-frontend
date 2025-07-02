import { Ban } from 'lucide-react'

const ErrorBoundary = ({ withText = true, text = 'دریافت اطلاعات با خطا مواجه شد', className = '' }) => {
    return (
        <div
            className={`w-full h-full grow max-h-max flex items-center justify-center gap-x-2 text-error py-5 ${className}`}
        >
            <Ban />
            {withText && <span className='font-medium text-error-light'>{text}</span>}
        </div>
    )
}

export { ErrorBoundary }

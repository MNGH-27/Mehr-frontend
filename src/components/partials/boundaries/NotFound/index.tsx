import { FolderOpen } from 'lucide-react'

const NotFoundBoundary = ({ withText = true, text = 'اطلاعاتی برای نمایش یافت نشد', className = '' }) => {
    return (
        <div className={`w-full h-full grow flex items-center justify-center gap-x-2 text-primary py-5 ${className}`}>
            <FolderOpen />
            {withText && <span className='font-medium'>{text}</span>}
        </div>
    )
}

export { NotFoundBoundary }

import { Loader } from '@mantine/core'

const LoadingBoundary = ({ withText = true, text = 'در حال دریافت اطلاعات', className = '' }) => {
    return (
        <div className={`w-full h-full grow flex items-center justify-center gap-x-2 py-5 ${className}`}>
            <Loader size={'sm'} />
            {withText && <span className='font-medium text-secondary-800'>{text}</span>}
        </div>
    )
}

export { LoadingBoundary }

import { type FC } from 'react'
import Image from 'next/image'
import { CheckSquare } from 'lucide-react'

import { SButton } from '@atoms/SButton'

interface ISingleNotifyProps {
    status: 'required' | 'warning'
    title: string
    description: string
    date: string
    isRead: boolean
}

const SingleNotify: FC<ISingleNotifyProps> = ({ date, description, isRead, status, title }) => {
    return (
        <div
            className={`flex lg:flex-row flex-col items-center justify-between gap-3 p-3 rounded-xl ${isRead ? '' : status === 'warning' ? 'bg-primary-tinted-100' : 'bg-error-extralight'}`}
        >
            <div className='flex items-center justify-end gap-6'>
                {status === 'required' ? (
                    <Image
                        src={'/images/red-alert.png'}
                        className='hidden sm:block'
                        width={36}
                        height={36}
                        alt='alert icon'
                    />
                ) : (
                    <Image
                        src={'/images/yellow-alert.png'}
                        className='hidden sm:block'
                        width={36}
                        height={36}
                        alt='alert icon'
                    />
                )}
                <div className='flex flex-col items-start justify-start gap-2 w-full'>
                    <div className='flex md:flex-row flex-col items-center justify-between gap-1 w-full'>
                        <span className='text-black font-semibold'>{title}</span>
                        <span className='text-xs text-gray-700'>{date}</span>
                    </div>
                    <span className='text-gray-700 font-medium text-sm'>{description}</span>
                </div>
            </div>

            <SButton variant={status === 'required' ? 'OutlineError' : 'OutlinePrimary'} size='SM' className='!w-fit'>
                <CheckSquare />
                علامت زدن به عنوان خوانده شده
            </SButton>
        </div>
    )
}

export default SingleNotify

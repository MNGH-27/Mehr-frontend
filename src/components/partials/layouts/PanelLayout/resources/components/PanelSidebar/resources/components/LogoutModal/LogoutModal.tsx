import { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'
import { useAuthStore } from '@core/services/stores/auth.store'

interface ILogoutModalProps {
    onClose: () => void
}

const LogoutModal: FC<ILogoutModalProps> = ({ onClose }) => {
    const { push } = useRouter()
    const queryClient = useQueryClient()
    const { clearUserData } = useAuthStore()

    const onLogoutHandler = () => {
        clearUserData()

        //reset all queries
        queryClient.removeQueries()

        //open login of this site from this
        push(Routes.Login())
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-y-1'>
                <span className='text-blue-shade-900 text-xl sm:text-2xl font-medium'>
                    آیا میخواهید از سامانه مهر خارج شوید ؟
                </span>
                <span className='text-gray-600 text-xs sm:text-sm'>
                    با خروج از سامانه دسترسی شما به اطلاعات تا زمانی که دوباره اقدام به ورود کنید بسته خواهد شد.{' '}
                </span>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-center gap-y-2 gap-x-5'>
                <SButton onClick={onClose} size='M' variant='OutlineSecondary'>
                    انصراف
                </SButton>
                <SButton onClick={onLogoutHandler} size='M' variant='FilledError'>
                    خروج
                </SButton>
            </div>
        </>
    )
}

export default LogoutModal

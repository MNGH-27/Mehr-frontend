'use client'

import { type FC } from 'react'
import Image from 'next/image'
import { RefreshCcw } from 'lucide-react'

import { type TCriticalAny } from '@core/types/type-any'

interface ISCaptchaProps {
    captcha: TCriticalAny
    isFetchingCaptcha: boolean
    refetchCaptcha: () => void
}

const SCaptcha: FC<ISCaptchaProps> = ({ captcha, isFetchingCaptcha, refetchCaptcha }) => {
    return (
        <div className='flex h-fit justify-between border-2 border-gray-300 rounded-md gap-3 py-1.5 px-2 md:mt-7 w-full'>
            <button
                onClick={refetchCaptcha}
                type='button'
                className='flex justify-between items-center gap-1 text-sm  h-fit bg-blue-tint-100 p-1  text-blue-tint-600 rounded-lg'
            >
                <RefreshCcw
                    className={`bg-primary p-1 rounded-full ${isFetchingCaptcha ? 'animate-spin' : ''}`}
                    size='22'
                    color='white'
                />
            </button>

            {captcha?.image && (
                <Image
                    src={`data:image/png;base64, ${captcha.image}`}
                    alt='کد امنیتی'
                    width={140}
                    height={30}
                    className='w-[120px] h-[20px]'
                />
            )}
        </div>
    )
}

export default SCaptcha

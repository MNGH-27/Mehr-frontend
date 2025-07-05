'use client'
 
import { useEffect, useState } from 'react'
import { Bell, SearchIcon } from 'lucide-react'
import moment from 'moment-jalaali'

import { SButton } from '@atoms/SButton'

const PanelHeader = () => {
    moment.loadPersian({ usePersianDigits: true })
    const [fullName, setFullName] = useState('')

    //get fullName from localStorage
    useEffect(() => {
        if (localStorage.getItem('fullName')) setFullName(localStorage.getItem('fullName') ?? '')
    }, [])

    return (
        <header className='flex items-center justify-between gap-x-10 lg:gap-x-20 px-5 md:px-0 md:pl-5 mb-3 lg:mb-7'>
            <div className='flex lg:flex-col items-start justify-between lg:justify-start w-full py-2'>
                <span className='text-lg lg:text-xl xl:text-2xl font-semibold text-primary-tinted-800'>
                    سلام {fullName} عزیز، خوش آمدی!
                </span>
                <span className='text-sm hidden md:!block text-gray-600'>
                    امروز {moment().format('jDD jMMMM jYYYY')}
                </span>
            </div>

            <div className='hidden lg:flex items-center justify-center gap-x-6 text-secondary-600'>
                <SButton size='None' variant='None' className='!w-fit hover:text-primary'>
                    <SearchIcon />
                </SButton>
                <SButton size='None' variant='None' className='!w-fit hover:text-primary'>
                    <Bell />
                </SButton>
            </div>
        </header>
    )
}

export default PanelHeader

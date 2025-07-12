'use client'
 
import { Bell, SearchIcon } from 'lucide-react'
import moment from 'moment-jalaali'

import { SButton } from '@atoms/SButton'

const PanelHeader = () => {
    moment.loadPersian({ usePersianDigits: true })

    return (
        <header className='flex items-center justify-between gap-x-10 lg:gap-x-20 mt-2 px-5 md:px-0 md:pl-5 mb-3 lg:mb-7'>
            <span className='text-sm hidden md:!block text-gray-600'>امروز {moment().format('jDD jMMMM jYYYY')}</span>

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

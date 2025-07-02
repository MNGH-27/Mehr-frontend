import { ArrowLeft } from 'lucide-react'

import { SButton } from '@atoms/SButton'

import { SingleNotify } from './resources'

const DashboardNotification = () => {
    return (
        <div className='space-y-3 md:space-y-5'>
            <SingleNotify type='error' title='فقط دو روز تا موعد آپلود گزارش “عملکرد ماهیانه باقی مانده است.' />
            <SingleNotify type='warning' title='فقط دو روز تا موعد آپلود گزارش “عملکرد ماهیانه باقی مانده است.' />
            <SingleNotify type='success' title='فقط دو روز تا موعد آپلود گزارش “عملکرد ماهیانه باقی مانده است.' />
            <SButton size='SM' variant='None'>
                مشاهده بیشتر
                <ArrowLeft size={16} />
            </SButton>
        </div>
    )
}

export default DashboardNotification

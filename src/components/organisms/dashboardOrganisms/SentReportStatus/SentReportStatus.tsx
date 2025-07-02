'use client'

import { ArrowLeft } from 'lucide-react'

import { SButton } from '@atoms/SButton'

import { Chart, SingleProgress } from './resources'

const SentReportStatus = () => {
    return (
        <div className='space-y-5 w-full'>
            <div className='grid grid-cols-12 h-fit'>
                <div className='col-span-full md:col-span-5 space-y-5'>
                    <SingleProgress color='success' title='تایید شده' progress={43} />
                    <SingleProgress color='secondary' title='عدم تایید' progress={27} />
                    <SingleProgress color='primary' title='قفل شده' progress={30} />
                </div>

                <Chart
                    className='col-span-full md:col-span-7 min-h-[200px]'
                    centerText='138'
                    series={{
                        type: 'pie',
                        name: 'وضعیت گزارشات ارسالی',
                        data: [
                            { name: 'تایید شده', y: 43, color: '#00BA88' },
                            { name: 'عدم تایید', y: 27, color: '#253038' },
                            { name: 'قفل شده', y: 30, color: '#FFB066' }
                        ]
                    }}
                />
            </div>
            <SButton size='M' variant='None'>
                مشاهده بیشتر
                <ArrowLeft size={16} />
            </SButton>
        </div>
    )
}

export default SentReportStatus

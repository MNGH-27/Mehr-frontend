'use client'

import { type FC } from 'react'
import { Calendar, Notebook, Phone, User2 } from 'lucide-react'
import moment from 'moment-jalaali'

import { type IUserFormProps } from './resources'

const UserForm: FC<IUserFormProps> = ({ data }) => {
    return (
        <div className='grid md:grid-cols-2 gap-5'>
            <div className='flex flex-col items-start justify-between gap-2'>
                <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                    <User2 className='size-5 shrink-0 text-primary' />
                    نام
                </p>
                <span className='font-semibold'>{data?.fullName}</span>
            </div>
            <div className='flex flex-col items-start justify-between gap-2'>
                <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                    <Phone className='size-5 shrink-0 text-primary' />
                    تلفن همراه
                </p>
                <span className='font-semibold'>{data?.phonenumber}</span>
            </div>
            <div className='flex flex-col items-start justify-between gap-2'>
                <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                    <Notebook className='size-5 shrink-0 text-primary' />
                    کد ملی
                </p>
                <span className='font-semibold'>{data?.natId}</span>
            </div>
            <div className='flex flex-col items-start justify-between gap-2'>
                <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                    <Calendar className='size-5 shrink-0 text-primary' />
                    تاریخ تولد
                </p>
                <span className='font-semibold'>{moment(data?.birthDate).format('jYYYY/jMM/jDD')}</span>
            </div>
        </div>
    )
}

export default UserForm

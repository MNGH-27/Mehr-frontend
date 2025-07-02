import React, { type FC } from 'react'
import { User2Icon } from 'lucide-react'

import { type TUserDataType } from '@core/types/api/user/user-data'

interface IUserDetailProps {
    data?: TUserDataType
}

const UserDetail: FC<IUserDetailProps> = ({ data }) => {
    return (
        <div className='flex lg:flex-row flex-col items-center lg:items-start justify-between w-full'>
            <div className='flex lg:flex-row flex-col items-center justify-center gap-2'>
                <div className='size-20 rounded-full flex items-center justify-center border-2 border-secondary-800 text-secondary-800'>
                    <User2Icon className='size-14 shrink-0' />
                </div>
                <div className='flex flex-col items-center lg:items-start justify-center lg:justify-start font-medium gap-y-2'>
                    <span className='font-black text-lg text-secondary-900'>{data?.fullName}</span>
                    <span className='text-secondary-700 font-semibold'>
                        {data?.roleName ?? '-'} / {data?.companyName ?? '-'}
                    </span>
                    <span className='text-secondary-700 font-semibold'>{data?.email}</span>
                </div>
            </div>
        </div>
    )
}

export default UserDetail

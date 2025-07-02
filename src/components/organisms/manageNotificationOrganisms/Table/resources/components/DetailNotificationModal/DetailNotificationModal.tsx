import { type FC } from 'react'
import moment from 'moment-jalaali'

import { type IDetailNotificationModalProps } from './resources'

const DetailNotificationModal: FC<IDetailNotificationModalProps> = ({ data }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-y-3'>
            <div className='grid md:grid-cols-2 gap-5 w-full mb-8'>
                <div className='flex items-center justify-between bg-primary-tinted-100 rounded-md px-3 py-4'>
                    <span className='font-medium text-secondary-900'>وضعیت پیام : </span>
                    <span className='text-secondary-900'>{data?.titleNewsType}</span>
                </div>
                <div className='flex items-center justify-between bg-primary-tinted-100 rounded-md px-3 py-4'>
                    <span className='font-medium text-secondary-900'>وضعیت دسته بندی : </span>
                    <span className='text-secondary-900'>{data?.titleSystemType}</span>
                </div>
            </div>

            <div className='flex items-start justify-start w-full flex-col'>
                <span className='text-2xl font-semibold text-secondary-900'>-{data?.title}</span>
                <span className='text-xs text-secondary-800'>({moment(data?.createAt).format('jYYYY/jMM/jDD')})</span>
            </div>
            <p className='w-full text-right text-lg font-medium text-secondary-900'>-{data?.subTitle}</p>
            {data?.description && (
                <div className='flex flex-col items-start justify-start gap-y-1 w-full'>
                    <span className='font-medium text-secondary-900 text-lg'>متن اعلان : </span>
                    <span className='text-secondary-900'>{data?.description}</span>
                </div>
            )}
        </div>
    )
}

export default DetailNotificationModal

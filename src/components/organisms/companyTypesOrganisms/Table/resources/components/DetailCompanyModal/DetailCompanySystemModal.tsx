import React, { type FC, Fragment } from 'react'

import { type IDetailCompanySystemModalProps } from './types/types'

const DetailCompanySystemModal: FC<IDetailCompanySystemModalProps> = ({ data }) => {
    return (
        <div className='flex flex-col gap-y-5'>
            <div className='grid grid-cols-2 w-full gap-5'>
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>نام فارسی</span>
                    <span className='text-primary font-medium'>{data?.name}</span>
                </div>
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>نام انگلیسی</span>
                    <span className='text-primary font-medium'>{data?.englishName}</span>
                </div>
            </div>

            {data?.childs && data?.childs.length > 0 && (
                <div>
                    <hr />
                    <p className='my-3 font-medium text-secondary-800'>دسته‌بندی های زیر مجموعه</p>
                    {data?.childs.map((singleChild, index) => (
                        <Fragment key={index}>
                            {index !== 0 && <hr />}
                            <div className='grid grid-cols-2 w-full gap-5'>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>نام فارسی</span>
                                    <span className='text-primary font-medium'>{singleChild?.name}</span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>نام انگلیسی</span>
                                    <span className='text-primary font-medium'>{singleChild?.englishName}</span>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DetailCompanySystemModal

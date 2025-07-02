import React, { type FC, Fragment } from 'react'
import moment from 'moment-jalaali'

import { SBadge } from '@atoms/SBadge'

import { type IDetailCompanyModalProps } from './types/types'

const DetailCompanyModal: FC<IDetailCompanyModalProps> = ({ data }) => {
    return (
        <div className='flex flex-col gap-y-5'>
            <div className='grid grid-cols-2 w-full gap-5'>
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>نام</span>
                    <span className='text-primary font-medium'>{data?.companyName}</span>
                </div>
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>دسته بندی شرکت</span>
                    <span className='text-primary font-medium'>
                        {data?.companyTypes.map((item, index) => (
                            <SBadge key={index} variant='light'>
                                {item.name}
                            </SBadge>
                        ))}
                    </span>
                </div>
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>سال مالی</span>
                    <span className='text-primary font-medium'>{moment(data?.fiscalYear).format('jYYYY/jMM/jDD')}</span>
                </div>
                <div className='flex items-center justify-start gap-1 flex-wrap'>
                    <span className='text-secondary-800'>نوع شرکت</span>
                    <span className='text-primary font-medium'>{data?.isForeigner ? 'خارجی' : 'ایرانی'}</span>
                </div>
            </div>

            {data?.childCompanies && data?.childCompanies.length > 0 && (
                <div>
                    <hr />
                    <p className='my-3 font-medium text-secondary-800'>دسته بندی زیرمجموعه</p>
                    {data?.childCompanies.map((singleChild, index) => (
                        <Fragment key={index}>
                            {index !== 0 && <hr />}
                            <div className='grid grid-cols-2 w-full gap-5'>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>نام</span>
                                    <span className='text-primary font-medium'>{singleChild?.companyName}</span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>دسته بندی شرکت</span>
                                    <span className='text-primary font-medium'>
                                        {singleChild?.companyTypes.length > 0
                                            ? singleChild?.companyTypes.map((item, index) => (
                                                  <SBadge key={index} variant='light'>
                                                      {item.name}
                                                  </SBadge>
                                              ))
                                            : '-'}
                                    </span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>سال مالی</span>
                                    <span className='text-primary font-medium'>
                                        {moment(singleChild?.fiscalYear).format('jYYYY/jMM/jDD')}
                                    </span>
                                </div>
                                <div className='flex items-center justify-start gap-1 flex-wrap'>
                                    <span className='text-secondary-800'>نوع شرکت</span>
                                    <span className='text-primary font-medium'>
                                        {singleChild?.isForeigner ? 'خارجی' : 'ایرانی'}
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DetailCompanyModal

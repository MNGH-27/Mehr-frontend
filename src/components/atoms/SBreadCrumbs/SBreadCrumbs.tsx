'use client'

import { type FC } from 'react'
import Link from 'next/link'
import { ChevronLeft, Home } from 'lucide-react'
import { Anchor, Breadcrumbs } from '@mantine/core'

import { Routes } from '@core/constants/routes'

import { type ISBreadCrumbsProps } from './resources'

const SBreadCrumbs: FC<ISBreadCrumbsProps> = ({ items, className = '' }) => {
    return (
        <Breadcrumbs
            separator={<ChevronLeft className='text-gray-500 mx-1' size='12' />}
            className={
                `w-full shadow-[0_0_4px_0_rgba(0,0,0,0.15)] !items-center !text-sm !h-fit py-3 px-4 rounded-lg flex flex-wrap mb-3` +
                className
            }
        >
            <Anchor component={Link} className='!flex gap-4 !text-secondary-900 !text-sm' href={Routes.Panel()}>
                <Home className='text-secondary-900 fill-secondary-900' size={20} />
                صفحه اصلی پنل
            </Anchor>
            {items.map((item, index) => (
                <Anchor
                    component={Link}
                    className={`!text-sm ${index === items.length - 1 ? '!text-gray-700 pointer-events-none' : '!text-gray-800'}`}
                    href={item.href}
                    key={index}
                >
                    {item.title}
                </Anchor>
            ))}
        </Breadcrumbs>
    )
}

export default SBreadCrumbs

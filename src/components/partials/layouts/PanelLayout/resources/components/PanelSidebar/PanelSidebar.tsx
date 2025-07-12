'use client'

import { type FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightToLineIcon, ChevronLeft } from 'lucide-react'
import { useDisclosure } from '@mantine/hooks'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'
import { SNavLink } from '@atoms/SNavLink'

import { Routes } from '@core/constants/routes'

import { type IPanelSidebarProps, LogoutModal, SIDEBAR_LIST } from './resources'

const PanelSidebar: FC<IPanelSidebarProps> = ({ closeSidebarHandler, isShowSidebar }) => {
    const pathname = usePathname()

    const [isShowLogoutModal, { close: onCloseLogoutModal, open: onOpenLogoutModal }] = useDisclosure(false)
    const [fullName, setFullName] = useState('')

    //get fullName from localStorage
    useEffect(() => {
        if (localStorage.getItem('fullName')) setFullName(localStorage.getItem('fullName') ?? '')
    }, [])
    const checkIsActive = (href: string) => (href !== '/panel' ? pathname.includes(href) : pathname === href)

    return (
        <>
            <div
                onClick={closeSidebarHandler}
                className={`fixed top-0 right-0 bg-black/70 backdrop-blur-[2px] w-full h-full z-20 ${isShowSidebar ? 'block lg:hidden' : 'hidden'}`}
            ></div>
            <aside
                className={`${isShowSidebar ? 'right-0' : '-right-96'} duration-500 fixed lg:static bg-gray-100 z-30 top-0 rounded-l-2xl lg:rounded-2xl py-5 px-2 !m-0 w-[300px] h-full flex flex-col justify-start max-h-full overflow-y-auto`}
            >
                <div className='flex w-full items-center justify-between mb-5'>
                    <div className='flex items-center justify-start gap-x-2'>
                        <Image src='/images/logo-blue.png' alt='user-frame' width={40} height={40} />
                        <div className='flex flex-col'>
                            <span className='font-semibold'>سامانه گزارش گیری</span>
                            <span className='text-[10px] text-gray-600'>وزارت آموزش پرورش</span>
                        </div>
                    </div>

                    <SButton
                        onClick={onOpenLogoutModal}
                        variant='TextGray'
                        size='None'
                        className='hover:!text-error !w-fit'
                    >
                        <ArrowRightToLineIcon className='size-4' />
                    </SButton>
                </div>
                <div className='mb-auto space-y-2'>
                    {SIDEBAR_LIST.map((sidebarGroup, index) => {
                        return (
                            <div key={index} className='mb-3'>
                                <span className='text-xs font-semibold text-gray-500 mb-1'>
                                    {sidebarGroup.groupTitle}
                                </span>
                                <div className='space-y-1'>
                                    {sidebarGroup.groupList.map((sidebarItem, index) => {
                                        return (
                                            <SNavLink
                                                active={checkIsActive(sidebarItem.href)}
                                                label={sidebarItem.title}
                                                key={index}
                                                href={sidebarItem.href}
                                                leftSection={sidebarItem.icon}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Link
                    href={Routes.Profile()}
                    className={`${pathname === Routes.Profile() ? '!bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.15)] !text-primary-tinted-950' : ''} p-3 rounded-lg duration-300 hover:bg-white hover:text-primary-tinted-950 flex w-full items-center justify-between cursor-pointer mt-5`}
                >
                    <div className='flex items-center justify-start gap-x-2'>
                        <Image src='/images/user-frame.png' alt='user-frame' width={40} height={40} />
                        <div className='flex flex-col gap-y-1'>
                            <span className='font-semibold'>{fullName}</span>
                            <span className='text-[10px]'>کارمند ثبت آمار</span>
                        </div>
                    </div>

                    <ChevronLeft />
                </Link>
            </aside>

            <SModal onClose={onCloseLogoutModal} opened={isShowLogoutModal}>
                <LogoutModal onClose={onCloseLogoutModal} />
            </SModal>
        </>
    )
}

export default PanelSidebar

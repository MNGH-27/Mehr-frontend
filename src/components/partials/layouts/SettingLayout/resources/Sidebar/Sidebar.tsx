'use client'

import { usePathname } from 'next/navigation'

import { SNavLink } from '@atoms/SNavLink'

import { SIDEBAR_LIST } from './resources'

const SettingSidebar = () => {
    const pathName = usePathname()

    return (
        <>
            <div className={`space-y-5 duration-300 lg:!h-fit overflow-hidden`}>
                {SIDEBAR_LIST.map((sidebarGroup, index) => (
                    <div key={index}>
                        <span className='text-gray text-xs font-semibold'>{sidebarGroup.groupTitle}</span>
                        <div className='space-y-1'>
                            {sidebarGroup.groupList.map((sidebarItem, index) => (
                                <SNavLink
                                    active={sidebarItem.href === pathName}
                                    label={sidebarItem.title}
                                    key={index}
                                    href={sidebarItem.href}
                                    leftSection={sidebarItem.icon}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SettingSidebar

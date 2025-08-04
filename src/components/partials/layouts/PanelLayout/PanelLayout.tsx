'use client'

import { type FC } from 'react'
import Image from 'next/image'
import { Menu, UserCog } from 'lucide-react'
import { useDisclosure } from '@mantine/hooks'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { useCheckLogin } from '@core/utils/hooks/use-check-login.hooks'

import { type IPanelLayoutProps, PanelHeader, PanelSidebar } from './resources'
import { SetRoleModal } from './resources/components/PanelHeader/resources'

const PanelLayout: FC<IPanelLayoutProps> = ({ children }) => {
    const [isShowSidebar, { close: onCloseSidebar, open: onOpenSidebar }] = useDisclosure(false)
    const [isShowSetRoleModal, { open: openSetRoleModal, close: closeSetRoleModal }] = useDisclosure(false)
    useCheckLogin()

    return (
        <main className='p-2 lg:p-4 h-screen w-screen space-y-3 bg-white lg:bg-gray-100 flex flex-col    lg:flex-row items-center gap-x-4'>
            <PanelSidebar closeSidebarHandler={onCloseSidebar} isShowSidebar={isShowSidebar} />
            <header className='w-full flex lg:hidden items-center justify-between px-1'>
                <Image src='/images/logo-blue-text.png' alt='user-frame' width={40} height={40} />

                <div className='flex items-center justify-center gap-x-6 text-secondary-600'>
                    <SButton
                        onClick={openSetRoleModal}
                        size='None'
                        variant='None'
                        className='!w-fit hover:text-primary'
                    >
                        تغییر نقش
                        <UserCog />
                    </SButton>
                    <SButton
                        onClick={onOpenSidebar}
                        size='None'
                        variant='None'
                        className='!w-fit text-gray-800 hover:text-primary'
                    >
                        <Menu />
                    </SButton>
                </div>
            </header>
            <section className='h-full w-full flex p-1 bg-white rounded-lg shadow-sm'>
                <div className='h-full overflow-y-auto max-h-full w-full p-3 border rounded-lg'>
                    <PanelHeader />
                    {children}
                </div>
            </section>
            <SModal
                onClose={closeSetRoleModal}
                opened={isShowSetRoleModal}
                topSection={{
                    title: 'تغییر نقش',
                    description: 'دقت کنید که با تغییر نقش دسترسی شما نیز تغییر خواهد کرد',
                    icon: <UserCog />
                }}
            >
                <SetRoleModal onClose={closeSetRoleModal} />
            </SModal>
        </main>
    )
}

export default PanelLayout

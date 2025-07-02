'use client'

import { type FC } from 'react'
import Image from 'next/image'
import { Menu, SearchIcon, User2 } from 'lucide-react'
import { useDisclosure } from '@mantine/hooks'

import { SButton } from '@atoms/SButton'

import { type IPanelLayoutProps, PanelHeader, PanelSidebar } from './resources'

const PanelLayout: FC<IPanelLayoutProps> = ({ children }) => {
    const [isShowSidebar, { close: onCloseSidebar, open: onOpenSidebar }] = useDisclosure(false)

    // //redirect user to panel if there is no token in cookie
    // useEffect(() => {
    //     const accessToken = localStorage.getItem('token')

    //     //check if there is no token in cookie
    //     if (!accessToken) {
    //         localStorage.removeItem('fullName')
    //         localStorage.removeItem('lastRole')

    //         localStorage.removeItem('token')

    //         //reset all queries
    //         queryClient.removeQueries()

    //         push(Routes.Login())
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <main className='p-2 lg:p-4 h-screen w-screen space-y-3 bg-white lg:bg-gray-100 flex flex-col    lg:flex-row items-center gap-x-4'>
            <PanelSidebar closeSidebarHandler={onCloseSidebar} isShowSidebar={isShowSidebar} />
            <header className='w-full flex lg:hidden items-center justify-between px-1'>
                <Image src='/images/logo-blue-text.png' alt='user-frame' width={40} height={40} />

                <div className='flex items-center justify-center gap-x-6 text-secondary-600'>
                    <SButton size='None' variant='None' className='!w-fit text-gray-800 hover:text-primary'>
                        <SearchIcon />
                    </SButton>
                    <SButton size='None' variant='None' className='!w-fit text-gray-800 hover:text-primary'>
                        <User2 />
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
        </main>
    )
}

export default PanelLayout

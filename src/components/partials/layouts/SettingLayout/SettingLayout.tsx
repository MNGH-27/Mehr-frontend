import { type FC, type PropsWithChildren } from 'react'

import { SMainContainer } from '@molecules/SMainContainer'

import { SettingHeaderHeader, SettingLayoutFooter, SettingSidebar } from './resources'

const SettingLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SettingHeaderHeader />

            <div className='w-full grid grid-cols-12 gap-5 relative'>
                <SMainContainer className='col-span-full lg:col-span-4 hidden md:!grid'>
                    <SettingSidebar />
                </SMainContainer>

                <SMainContainer className='col-span-full lg:col-span-8 py-6 px-5 space-y-8'>{children}</SMainContainer>
            </div>

            <SettingLayoutFooter />
        </>
    )
}

export default SettingLayout

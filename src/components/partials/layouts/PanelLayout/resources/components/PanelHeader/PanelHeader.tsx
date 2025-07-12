'use client'
 
import { UserCog } from 'lucide-react'
import moment from 'moment-jalaali'
import { useDisclosure } from '@mantine/hooks'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { SetRoleModal } from './resources'

const PanelHeader = () => {
    const [isShowSetRoleModal, { open: openSetRoleModal, close: closeSetRoleModal }] = useDisclosure(false)

    moment.loadPersian({ usePersianDigits: true })

    return (
        <>
            <header className='flex items-center justify-between gap-x-10 lg:gap-x-20 mt-2 px-5 md:px-0 md:pl-5 mb-3 lg:mb-7'>
                <span className='text-sm hidden md:!block text-gray-600'>
                    امروز {moment().format('jDD jMMMM jYYYY')}
                </span>

                <div className='hidden lg:flex items-center justify-center gap-x-6 text-secondary-600'>
                    <SButton
                        onClick={openSetRoleModal}
                        size='None'
                        variant='None'
                        className='!w-fit hover:text-primary'
                    >
                        تغییر نقش
                        <UserCog />
                    </SButton>
                </div>
            </header>

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
        </>
    )
}

export default PanelHeader

'use client'

import { type FC } from 'react'
import { Building2, Mail, Pencil, Phone, UserCog2, UserRoundPen } from 'lucide-react'
import { useDisclosure } from '@mantine/hooks'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { EditProfileModal, type IUserFormProps } from './resources'

const UserForm: FC<IUserFormProps> = ({ data }) => {
    const [isShowModal, { close: onCloseModal, open: onOpenModal }] = useDisclosure(false)

    return (
        <div className='flex flex-col w-full'>
            <SButton onClick={onOpenModal} variant='TextPrimary' size='SM' className='!w-fit mr-auto'>
                <Pencil size={20} />
                ویرایش اطلاعات
            </SButton>

            <div className='grid md:grid-cols-2 gap-5'>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                        <Phone className='size-5 shrink-0 text-primary' />
                        تلفن همراه
                    </p>
                    <span className='font-semibold'>{data?.phoneNumber}</span>
                </div>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                        <Mail className='size-5 shrink-0 text-primary' />
                        ایمیل
                    </p>
                    <span className='font-semibold'>{data?.email}</span>
                </div>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                        <Building2 className='size-5 shrink-0 text-primary' />
                        شرکت
                    </p>
                    <span className='font-semibold'>{data?.companyName ?? '-'}</span>
                </div>
                <div className='flex flex-col items-start justify-between gap-2'>
                    <p className='flex items-center justify-center gap-x-1 text-secondary-800'>
                        <UserCog2 className='size-5 shrink-0 text-primary' />
                        شرکت
                    </p>
                    <span className='font-semibold'>{data?.roleName ?? '-'}</span>
                </div>
            </div>

            <SModal
                topSection={{
                    title: 'ویرایش پروفایل',
                    description: 'اطلاعات خود را وارد کنید',
                    icon: <UserRoundPen />
                }}
                onClose={onCloseModal}
                opened={isShowModal}
            >
                <EditProfileModal onClose={onCloseModal} data={data} />
            </SModal>
        </div>
    )
}

export default UserForm

import { type FC } from 'react'
import { X } from 'lucide-react'
import { Modal } from '@mantine/core'

import { type ISModalProps } from './resources'
import { SButton } from '../SButton'

const SModal: FC<ISModalProps> = ({
    withCloseButton = false,
    size = 'xl',
    classNames,
    onClose,
    topSection,
    children,
    ...rest
}) => {
    return (
        <Modal
            classNames={{
                header: '!top-[-15px]',
                title: '!w-full',
                overlay: `!z-[90] !bg-gray-600/70 ${classNames?.overlay ?? ''}`,
                inner: `!z-[95] !items-center ${classNames?.inner ?? ''}`,
                content: `!rounded-2xl border border-gray-200 px-4 md:!px-7 py-3 md:!py-6 ${classNames?.content ?? ''}`
            }}
            withCloseButton={withCloseButton}
            size={size}
            onClose={onClose}
            title={
                topSection && (
                    <div className='w-full flex justify-between mb-5 gap-x-5 grow'>
                        <div className='flex flex-col gap-y-1 w-full'>
                            <p className='flex items-center justify-start gap-x-1 text-lg md:text-xl font-semibold text-secondary-800'>
                                {topSection.icon && topSection.icon}
                                {topSection.title}
                            </p>

                            <p className='text-md sm:text-base text-secondary-700'>{topSection.description}</p>
                        </div>

                        {onClose && (
                            <SButton onClick={onClose} size='None' variant='None' className='!w-fit'>
                                <X size='26' className='text-primary shrink-0' />
                            </SButton>
                        )}
                    </div>
                )
            }
            {...rest}
        >
            {children}
        </Modal>
    )
}

export default SModal

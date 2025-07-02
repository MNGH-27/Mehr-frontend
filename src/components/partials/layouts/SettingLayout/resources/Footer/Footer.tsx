import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SMainContainer } from '@molecules/SMainContainer'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'

const SettingLayoutFooter = () => {
    return (
        <SMainContainer className='!py-2 flex items-center justify-between mt-5'>
            <SButton
                type='button'
                component={Link}
                href={Routes.Panel()}
                size='SM'
                variant='TextPrimary'
                className='!w-fit'
            >
                <ArrowRight />
                بازگشت
            </SButton>
        </SMainContainer>
    )
}

export default SettingLayoutFooter

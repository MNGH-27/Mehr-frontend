import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SMainContainer } from '@molecules/SMainContainer'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'

const PermissionFooter = () => {
    return (
        <SMainContainer className='!py-2 flex items-center justify-between'>
            <SButton component={Link} href={Routes.Roles()} size='SM' variant='TextPrimary' className='!w-fit'>
                <ArrowRight />
                بازگشت
            </SButton>
        </SMainContainer>
    )
}

export default PermissionFooter

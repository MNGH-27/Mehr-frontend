import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'

const DetailReportFooter = () => {
    return (
        <SButton component={Link} href={Routes.CreateReport()} size='SM' variant='TextPrimary' className='!w-fit'>
            <ArrowRight />
            بازگشت
        </SButton>
    )
}

export default DetailReportFooter

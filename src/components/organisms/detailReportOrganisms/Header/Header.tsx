import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

import { Routes } from '@core/constants/routes'

const BREADCRUMB_LIST = [
    {
        title: 'مدیریت گزارشات',
        href: Routes.CreateReport()
    },
    {
        title: 'جزئیات گزارش',
        href: Routes.CreateReport()
    }
]

const DetailReportHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default DetailReportHeader

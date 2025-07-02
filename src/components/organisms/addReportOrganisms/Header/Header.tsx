import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

import { Routes } from '@core/constants/routes'

const BREADCRUMB_LIST = [
    {
        title: 'گزارشات',
        href: Routes.ReportsAllReports()
    },
    {
        title: 'لیست گزارش',
        href: Routes.ReportsAllReports()
    },
    {
        title: 'اضافه کردن گزارش',
        href: ''
    }
]

const AddReportHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default AddReportHeader

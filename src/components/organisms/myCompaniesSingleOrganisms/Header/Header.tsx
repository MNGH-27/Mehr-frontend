import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

import { Routes } from '@core/constants/routes'

const BREADCRUMB_LIST = [
    {
        title: 'شرکت های من',
        href: Routes.MyCompanies()
    },
    {
        title: 'جزئیات شرکت',
        href: Routes.MyCompanies()
    }
]

const MyCompaniesSingleHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default MyCompaniesSingleHeader

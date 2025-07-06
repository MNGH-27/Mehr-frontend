import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

import { Routes } from '@core/constants/routes'

const BREADCRUMB_LIST = [
    {
        title: 'مدیریت سازمان',
        href: Routes.ManageOrgans()
    },
    {
        title: 'مدیریت نقش در سازمان',
        href: Routes.ManageOrgans()
    }
]

const ManageOrgansRoleHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default ManageOrgansRoleHeader

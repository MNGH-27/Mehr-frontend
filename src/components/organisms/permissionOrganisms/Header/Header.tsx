import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

import { Routes } from '@core/constants/routes'

const BREADCRUMB_LIST = [
    {
        title: 'نقش ها',
        href: Routes.Roles()
    },
    {
        title: 'دسترسی ها',
        href: ''
    }
]

const PermissionHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default PermissionHeader

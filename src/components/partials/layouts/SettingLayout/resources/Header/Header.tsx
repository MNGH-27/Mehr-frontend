import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

import { Routes } from '@core/constants/routes'

const BREADCRUMB_LIST = [
    {
        title: 'تنظیمات',
        href: Routes.Setting()
    },
    {
        title: 'پروفایل',
        href: ''
    }
]

const SettingHeaderHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default SettingHeaderHeader

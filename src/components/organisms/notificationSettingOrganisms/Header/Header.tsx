import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'تنظیمات اعلان ها',
        href: ''
    }
]

const NotificationSettingHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default NotificationSettingHeader

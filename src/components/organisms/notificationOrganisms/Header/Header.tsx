import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'اعلان ها',
        href: ''
    }
]

const NotificationHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default NotificationHeader

import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'دسته بندی اعلان ها',
        href: ''
    }
]

const NotificationTypesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default NotificationTypesHeader

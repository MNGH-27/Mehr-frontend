import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'اعلان ها',
        href: ''
    }
]

const ManageNotificationHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default ManageNotificationHeader

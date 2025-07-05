import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'کاربر ها',
        href: ''
    }
]

const ManageOrganTypeHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default ManageOrganTypeHeader

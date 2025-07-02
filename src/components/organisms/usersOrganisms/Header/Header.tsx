import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'کاربر ها',
        href: ''
    }
]

const UsersHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default UsersHeader

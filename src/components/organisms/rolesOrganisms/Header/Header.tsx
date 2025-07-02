import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'نقش ها',
        href: ''
    }
]

const RolesFilterHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default RolesFilterHeader

import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'گزارشات',
        href: ''
    },
    {
        title: 'لیست گزارش',
        href: ''
    }
]

const AllReportsHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default AllReportsHeader

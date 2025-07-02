import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'گزارشات',
        href: ''
    },
    {
        title: 'انواع گزارش',
        href: ''
    }
]

const AllReportTypesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default AllReportTypesHeader

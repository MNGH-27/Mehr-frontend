import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'کارتابل گزارشات',
        href: ''
    }
]

const ReportCartableHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default ReportCartableHeader

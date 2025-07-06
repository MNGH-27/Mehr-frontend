import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'کاربر ها',
        href: ''
    }
]

const FillReportHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default FillReportHeader

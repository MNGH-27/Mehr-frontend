import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'سال های استثنا برای آپلود گزارش',
        href: ''
    }
]

const ExceptionYearsHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default ExceptionYearsHeader

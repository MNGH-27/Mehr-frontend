import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'لیست شرکت ها',
        href: ''
    }
]

const CompaniesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default CompaniesHeader

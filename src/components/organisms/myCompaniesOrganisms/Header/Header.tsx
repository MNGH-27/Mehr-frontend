import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'شرکت های من',
        href: ''
    }
]

const MyCompaniesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default MyCompaniesHeader

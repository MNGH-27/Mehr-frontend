import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'لیست شرکت های یک نوع شرکت',
        href: ''
    }
]

const SingleCompanyTypesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default SingleCompanyTypesHeader

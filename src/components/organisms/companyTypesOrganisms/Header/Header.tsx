import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'دسته بندی شرکت ها',
        href: ''
    }
]

const CompanyTypesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default CompanyTypesHeader

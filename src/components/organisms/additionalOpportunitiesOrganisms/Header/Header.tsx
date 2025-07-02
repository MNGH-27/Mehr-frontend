import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'تعریف فرصت اضافه برای شرکت ها',
        href: ''
    }
]

const AdditionalOpportunitiesHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default AdditionalOpportunitiesHeader

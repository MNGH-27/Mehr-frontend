import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'آرشیو گزارشات',
        href: ''
    }
]

const DocumentArchiveHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default DocumentArchiveHeader

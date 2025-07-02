import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'تغییر محدودیت زمانی برای انواع سند',
        href: ''
    }
]

const ChangeDocLimitHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default ChangeDocLimitHeader

import { SBreadCrumbs } from '@atoms/SBreadCrumbs'

const BREADCRUMB_LIST = [
    {
        title: 'کارکنان معاونت اقتصادی',
        href: ''
    }
]

const EmployeeOfEconomicHeader = () => {
    return <SBreadCrumbs items={BREADCRUMB_LIST} />
}

export default EmployeeOfEconomicHeader

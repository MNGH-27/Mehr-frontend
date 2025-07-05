import { Building2, ChartColumn, ChartNetworkIcon, ExternalLinkIcon, Home, Users2 } from 'lucide-react'

import { Routes } from '@core/constants/routes'

const SIDEBAR_LIST = [
    {
        groupTitle: 'داشبورد',
        groupList: [
            {
                title: 'خانه',
                icon: <Home size={20} />,
                href: Routes.Panel()
            },
            {
                title: 'ثبت آمار',
                icon: <ChartColumn size={20} />,
                href: '/chart-column'
            },
            {
                title: 'گزارش گیری',
                icon: <ChartNetworkIcon size={20} />,
                href: '/chart'
            },
            {
                title: 'مدیریت کاربران',
                icon: <Users2 size={20} />,
                href: Routes.Users()
            },
            {
                title: 'مدیریت سازمان ها',
                icon: <Building2 size={20} />,
                href: Routes.ManageOrgans()
            }
        ]
    },
    {
        groupTitle: 'سازمان های مرتبط',
        groupList: [
            {
                title: 'وزارت آموزش و پرورش',
                icon: <ExternalLinkIcon size={20} />,
                href: '/external-link-1'
            },
            {
                title: 'درگاه ملی مجوز ها',
                icon: <ExternalLinkIcon size={20} />,
                href: '/external-link-2'
            }
        ]
    }
]

export { SIDEBAR_LIST }

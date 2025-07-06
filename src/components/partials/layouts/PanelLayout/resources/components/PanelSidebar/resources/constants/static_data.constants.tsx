import { Building2, ChartColumn, ChartNetworkIcon, ExternalLinkIcon, Home, Users2, UserSquare2 } from 'lucide-react'

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
                href: Routes.FillReport()
            },
            {
                title: 'ساخت گزارش',
                icon: <ChartNetworkIcon size={20} />,
                href: Routes.CreateReport()
            }
        ]
    },
    {
        groupTitle: 'مدیریت',
        groupList: [
            {
                title: 'مدیریت کاربران',
                icon: <Users2 size={20} />,
                href: Routes.Users()
            },
            {
                title: 'مدیریت سازمان ها',
                icon: <Building2 size={20} />,
                href: Routes.ManageOrgans()
            },
            {
                title: 'مدیریت نوع سازمان ها',
                icon: <Building2 size={20} />,
                href: Routes.ManageOrganTypes()
            },
            {
                title: 'مدیریت نقش ها',
                icon: <UserSquare2 size={20} />,
                href: Routes.ManageRoleTypes()
            }
        ]
    },
    {
        groupTitle: 'سازمان های مرتبط',
        groupList: [
            {
                title: 'وزارت آموزش و پرورش',
                icon: <ExternalLinkIcon size={20} />,
                href: 'https://my.medu.ir/'
            }
        ]
    }
]

export { SIDEBAR_LIST }

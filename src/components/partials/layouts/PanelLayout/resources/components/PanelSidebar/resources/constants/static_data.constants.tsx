import { ChartColumn, ChartNetworkIcon, ExternalLinkIcon, Home } from 'lucide-react'

const SIDEBAR_LIST = [
    {
        groupTitle: 'داشبورد',
        groupList: [
            {
                title: 'خانه',
                icon: <Home size={20} />,
                href: '/'
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

import { Bell, LogIn, SquareUser, User } from 'lucide-react'

import { Routes } from '@core/constants/routes'

const SIDEBAR_LIST = [
    {
        groupTitle: 'اطلاعات کاربری',
        groupList: [
            {
                title: 'پروفایل',
                icon: <User size={18} />,
                href: Routes.Profile()
            },
            {
                title: 'تاریخچه ورود ها',
                icon: <LogIn size={18} />,
                href: Routes.SettingLoginLog()
            }
        ]
    },
    {
        groupTitle: 'اعلان ها',
        groupList: [
            {
                title: 'اعلان ها',
                icon: <Bell size={18} />,
                href: Routes.SettingNotification()
            }
        ]
    },
    {
        groupTitle: 'مدیریتی',
        groupList: [
            {
                title: 'لاگ های مدیریتی',
                icon: <SquareUser size={18} />,
                href: Routes.Panel()
            }
        ]
    }
]

export { SIDEBAR_LIST }

import React, { type FC } from 'react'
import { Tabs, type TabsTabProps } from '@mantine/core'

const STabsTab: FC<TabsTabProps> = ({ className = '', value = '', children, ...rest }) => {
    return (
        <Tabs.Tab
            value={value ?? ''}
            className={`!bg-transparent font-semibold !text-base !text-gray-800 ${className}`}
            {...rest}
        >
            {children}
        </Tabs.Tab>
    )
}
export default STabsTab

import React, { type FC } from 'react'
import { Tabs, type TabsProps } from '@mantine/core'

import { STabsPanel, STabsTab } from './resources'

const STabs: FC<TabsProps> & {
    Tab: typeof STabsTab
    Panel: typeof STabsPanel
} = ({ children, className = '', ...rest }) => {
    return (
        <Tabs className={`w-full ${className}`} {...rest}>
            <Tabs.List className='w-full' grow>
                {children}
            </Tabs.List>
        </Tabs>
    )
}

STabs.Tab = STabsTab
STabs.Panel = STabsPanel

export default STabs

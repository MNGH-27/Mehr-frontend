import React, { type FC } from 'react'
import { Tabs, type TabsPanelProps } from '@mantine/core'

const STabsPanel: FC<TabsPanelProps> = ({ value, children, ...rest }) => {
    return (
        <Tabs.Panel value={value} {...rest}>
            {children}
        </Tabs.Panel>
    )
}

export default STabsPanel

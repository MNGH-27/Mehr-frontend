'use client'

import { type FC, type PropsWithChildren } from 'react'
import { MantineProvider } from '@mantine/core'

import { MANTINE_THEME } from '@core/configs/mantine'

const MantineProviderLayout: FC<PropsWithChildren> = ({ children }) => {
    return <MantineProvider theme={MANTINE_THEME}>{children}</MantineProvider>
}

export default MantineProviderLayout

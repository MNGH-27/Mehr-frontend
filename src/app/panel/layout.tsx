import { type FC, type PropsWithChildren } from 'react'

import { PanelLayout } from '@partials/layouts/PanelLayout'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <PanelLayout>{children}</PanelLayout>
}
export default Layout

import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import { MantineProviderLayout, QueryParamProvider, TanstackQueryProvider } from '@partials/providers'

import IRAN_YEKAN_BAKH_FONT from '@core/configs/fonts/fonts.configs'

import 'react-toastify/dist/ReactToastify.css'
import './../styles/globals.css'

export const metadata: Metadata = {
    title: 'سامانه مهر',
    description: 'سامانه مهر'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang={'fa'} dir='rtl' className={IRAN_YEKAN_BAKH_FONT.variable}>
            <body dir='rtl' className={IRAN_YEKAN_BAKH_FONT.variable + ' overflow-hidden'}>
                <TanstackQueryProvider>
                    <QueryParamProvider>
                        <MantineProviderLayout>
                            {children}
                            <ToastContainer
                                bodyStyle={{
                                    direction: 'rtl'
                                }}
                            />
                        </MantineProviderLayout>
                    </QueryParamProvider>
                </TanstackQueryProvider>
            </body>
        </html>
    )
}

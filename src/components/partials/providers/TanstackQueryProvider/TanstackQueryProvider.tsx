'use client'

import { type FC, type PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        //five minute
                        staleTime: 5 * 60 * 60 * 1000,
                        refetchOnWindowFocus: false,
                        retry: false
                    }
                }
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
        </QueryClientProvider>
    )
}

export default TanstackQueryProvider

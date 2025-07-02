'use client'

import { type FC, type PropsWithChildren, Suspense } from 'react'
import NextAdapterApp from 'next-query-params/app'
import { QueryParamProvider as Provider } from 'use-query-params'

const QueryParamProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense>
            <Provider adapter={NextAdapterApp}>{children}</Provider>
        </Suspense>
    )
}

export default QueryParamProvider

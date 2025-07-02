import React, { type FC } from 'react'

import { type IFetchingProps } from './resources'
import { ErrorBoundary } from '../Error'
import { LoadingBoundary } from '../Loading'
import { NotFoundBoundary } from '../NotFound'

const FetchingBoundary: FC<IFetchingProps> = ({ isLoading, isError, children, length }) => {
    if (isLoading) {
        return <LoadingBoundary />
    }

    if (isError) {
        return <ErrorBoundary />
    }

    if (length !== undefined && length === 0) {
        return <NotFoundBoundary />
    }

    return children
}

export { FetchingBoundary }

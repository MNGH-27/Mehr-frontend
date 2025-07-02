import type React from 'react'

interface IFetchingProps {
    isLoading: boolean
    isError: boolean
    length?: number
    children: React.ReactNode
}

export type { IFetchingProps }

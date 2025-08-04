import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { Routes } from '@core/constants/routes'
import { useAuthStore } from '@core/services/stores/auth.store'

export const useCheckLogin = () => {
    const pathname = usePathname()
    const { push } = useRouter()
    const queryClient = useQueryClient()

    const { clearUserData, token, hasHydrated } = useAuthStore()

    useEffect(() => {
        if (hasHydrated) {
            if (!token && (pathname.includes('panel') || pathname === '/')) {
                clearUserData()
                queryClient.removeQueries()
                push(Routes.Login())
            } else if (token && (!pathname.includes('panel') || pathname === '/')) {
                clearUserData()
            }
        }
    }, [token, pathname, push, queryClient, clearUserData, hasHydrated])
}

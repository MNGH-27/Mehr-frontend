    import { create } from 'zustand'
    import { persist } from 'zustand/middleware'

    import { type TUserLastRoleType } from '@core/types/user/user.types'

    interface AuthState {
        token?: string
        fullName?: string
        userName?: string
        lastRole?: TUserLastRoleType
        hasHydrated: boolean
        setUserData: (data: { token?: string; fullName?: string; userName?: string; lastRole?: TUserLastRoleType }) => void
        clearUserData: () => void
        setHasHydrated: (state: boolean) => void
    }

    export const useAuthStore = create<AuthState>()(
        persist(
            (set) => ({
                token: undefined,
                fullName: undefined,
                userName: undefined,
                lastRole: undefined,
                hasHydrated: false,
                setUserData: (data) =>
                    set((state) => ({
                        token: data?.token ?? state.token,
                        fullName: data?.fullName ?? state.fullName,
                        userName: data?.userName ?? state.userName,
                        lastRole: data?.lastRole ?? state.lastRole
                    })),
                clearUserData: () =>
                    set({
                        token: undefined,
                        fullName: undefined,
                        userName: undefined,
                        lastRole: undefined
                    }),
                setHasHydrated: (state) => set({ hasHydrated: state })
            }),
            {
                name: 'mehr-user-storage',
                // اینجا hydration رو مدیریت می‌کنیم
                onRehydrateStorage: () => (state) => {
                    state?.setHasHydrated(true)
                }
            }
        )
    )

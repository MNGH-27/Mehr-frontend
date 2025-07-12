'use client'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { LoadingBoundary } from '@partials/boundaries/Loading'

import { ChangePassword, UserDetail, UserForm } from '@organisms/profileOrganisms'

import { useGetPersonalInfo } from '@core/services/hooks/user/useGetPersonalInfo'

const ProfileTemplate = () => {
    const { data: userData, isLoading: isLoadingUserData, isError: isErrorUserData } = useGetPersonalInfo({})

    if (isLoadingUserData) {
        return <LoadingBoundary />
    }

    if (isErrorUserData) {
        return <ErrorBoundary />
    }

    return (
        <>
            <UserDetail data={userData?.data} />

            <hr className='my-5' />

            <UserForm data={userData?.data} />

            <hr className='my-5' />

            <ChangePassword data={userData?.data} />
        </>
    )
}

export default ProfileTemplate

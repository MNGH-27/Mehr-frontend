import { type FC } from 'react'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { LoadingBoundary } from '@partials/boundaries/Loading'

import { useGetRoleOrgan } from '@core/services/hooks/user/useGetRoleOrgan'
import { type TUserListItemType } from '@core/types/api/users.types'

interface IUserRoleModalProps {
    data?: TUserListItemType
}
const UserRoleModal: FC<IUserRoleModalProps> = ({ data }) => {
    const {
        data: userRole,
        isLoading,
        isError
    } = useGetRoleOrgan({
        UserId: data?.id
    })

    if (isLoading) return <LoadingBoundary />
    if (isError) return <ErrorBoundary />

    return (
        <div className='flex items-center justify-center flex-col gap-x-5 w-full'>
            {userRole?.data.map((item, index) => (
                <div className='flex flex-col gap-y-2 w-full border-b border-dashed py-5' key={index}>
                    <div>
                        نام سازمان :<span className='font-semibold'>{item.organName}</span>
                    </div>
                    <div>
                        نقش :<span className='font-semibold'>{item.roleName}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserRoleModal

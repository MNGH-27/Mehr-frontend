import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { deleteUserMutationFn } from '@core/services/api/user/delete-user'
import { type TCriticalAny } from '@core/types/type-any'
import { TUserListItemType } from '@core/types/api/users.types'
import { useGetRoleOrgan } from '@core/services/hooks/user/useGetRoleOrgan'
import { LoadingBoundary } from '@partials/boundaries/Loading'
import { ErrorBoundary } from '@partials/boundaries/Error'

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

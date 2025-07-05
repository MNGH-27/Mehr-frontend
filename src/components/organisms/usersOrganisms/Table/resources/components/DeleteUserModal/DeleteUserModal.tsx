import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { deleteUserMutationFn } from '@core/services/api/user/delete-user'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDeleteUserModalProps } from './resources'

const DeleteUserModal: FC<IDeleteUserModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: deleteUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'کاربر با موفقیت حذف شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllUser]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'حذف کاربر با مشکل مواجه شد')
        }
    })

    return (
        <div className='flex items-center justify-center gap-x-5 mt-10'>
            <SButton onClick={onClose} size='M' variant='OutlineSecondary'>
                انصراف
            </SButton>
            <SButton
                onClick={() =>
                    mutate({
                        UserId: data?.id ?? -1
                    })
                }
                isLoading={isPending}
                size='M'
                variant='FilledError'
            >
                حذف
            </SButton>
        </div>
    )
}

export default DeleteUserModal

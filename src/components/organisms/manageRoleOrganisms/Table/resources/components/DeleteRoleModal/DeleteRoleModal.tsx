import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { deleteRoleMutationFn } from '@core/services/api/Role/delete-role'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDeleteRoleModalProps } from './resources'

const DeleteRoleModal: FC<IDeleteRoleModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: deleteRoleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'نقش با موفقیت حذف شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllRole]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'حذف نقش با مشکل مواجه شد')
        }
    })

    return (
        <div className='flex items-center justify-center gap-x-5'>
            <SButton onClick={onClose} size='M' variant='OutlineSecondary'>
                انصراف
            </SButton>
            <SButton
                onClick={() =>
                    mutate({
                        RoleId: data?.id ?? -1
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

export default DeleteRoleModal

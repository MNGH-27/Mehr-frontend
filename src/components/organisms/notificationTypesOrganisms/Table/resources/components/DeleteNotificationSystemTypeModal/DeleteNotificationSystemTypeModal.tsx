import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postDeleteCompanySystemTypeMutationFn } from '@core/services/api/company/post-delete-company-system-type'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDeleteNotificationSystemTypeModalProps } from './resources'

const DeleteNotificationSystemTypeModal: FC<IDeleteNotificationSystemTypeModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: postDeleteCompanySystemTypeMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'دسته‌بندی شرکت با موفقیت حذف شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllCompanySystemTypes]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'حذف دسته‌بندی شرکت با مشکل مواجه شد')
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
                        SysId: data?.id ?? -1
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

export default DeleteNotificationSystemTypeModal

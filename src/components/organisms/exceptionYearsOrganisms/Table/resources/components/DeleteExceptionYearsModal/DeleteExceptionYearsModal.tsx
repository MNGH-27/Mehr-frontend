import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postDeleteExceptionRuleMutationFn } from '@core/services/api/exception-rule/post-delete-exception-rule'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDeleteExceptionYearsModalProps } from './resources'

const DeleteExceptionYearsModal: FC<IDeleteExceptionYearsModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: postDeleteExceptionRuleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سال های استثنا برای آپلود گزارش با موفقیت حذف شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.ExceptionRules]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'حذف سال های استثنا برای آپلود گزارش با مشکل مواجه شد')
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
                        ExcRuleId: data?.id ?? -1
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

export default DeleteExceptionYearsModal

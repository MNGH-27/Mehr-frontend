import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postDeleteReportMutationFn } from '@core/services/api/report/post-delete-report'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDeleteReportModalProps } from './resources'

const DeleteReportModal: FC<IDeleteReportModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: postDeleteReportMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'گزارش با موفقیت حذف شد')

            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllReports]
            })

            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'حذف گزارش با مشکل مواجه شد')
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
                        ReportId: data?.reportId ?? -1
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

export default DeleteReportModal

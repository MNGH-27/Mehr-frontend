import { type FC } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { deleteOrganTypeMutationFn } from '@core/services/api/organ/delete-organ-type'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDeleteOrganTypeModalProps } from './resources'

const DeleteOrganTypeModal: FC<IDeleteOrganTypeModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: deleteOrganTypeMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سازمان با موفقیت حذف شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.GetAllOrganType]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'حذف سازمان با مشکل مواجه شد')
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
                        OrganTypeId: data?.id ?? -1
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

export default DeleteOrganTypeModal

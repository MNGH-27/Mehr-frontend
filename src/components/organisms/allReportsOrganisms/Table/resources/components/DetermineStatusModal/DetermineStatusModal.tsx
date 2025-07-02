import { type FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SDropZone } from '@molecules/SDropZone'
import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postChangeStatusCompanyReportMutationFn } from '@core/services/api/report/post-change-status-company-report'
import { type TCriticalAny } from '@core/types/type-any'

import { type IDetermineStatusModalProps } from './resources'

const DetermineStatusModal: FC<IDetermineStatusModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()
    const [documentId, setDocumentId] = useState('')

    const { mutate, isPending } = useMutation({
        mutationFn: postChangeStatusCompanyReportMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'گزارش با موفقیت ویرایش شد')

            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.CompanyReportByUserId]
            })
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.KartableReport]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ویرایش گزارش با مشکل مواجه شد')
        }
    })

    return (
        <div className='grid gap-5'>
            <SInputField errors={{}} name='' label='فایل گزارش'>
                <SDropZone
                    accept={`.${data?.documentFormatName}`}
                    onChange={(id) => setDocumentId(id.toString())}
                    value={documentId}
                />
            </SInputField>
            <div className='col-span-full flex items-center justify-end gap-3 sticky -bottom-7 bg-white py-5 z-50'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton
                    onClick={() => {
                        if (documentId.trim().length === 0) {
                            toast.error('باید یک فایل را انتخاب کنید')
                            return
                        }

                        mutate({
                            companyReportId: data?.companyReportId ?? -1,
                            documentId: documentId
                        })
                    }}
                    isLoading={isPending}
                    size='M'
                    variant='FilledSecondary'
                >
                    ثبت نهایی
                </SButton>
            </div>
        </div>
    )
}

export default DetermineStatusModal

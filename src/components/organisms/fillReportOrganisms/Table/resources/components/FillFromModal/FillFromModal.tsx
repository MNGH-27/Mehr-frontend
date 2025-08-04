import { type FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FileQuestion, NotebookPen } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postFillReportItemForRegionMutationFn } from '@core/services/api/report/post-fill-report-item-for-region'
import { useGetAllReportItem } from '@core/services/hooks/report/useGetAllReportItem'
import { type TReportDataItemType } from '@core/types/api/report.type'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'

interface IFillFromModalProps {
    onClose: () => void
    data?: TReportDataItemType
}

const FillFromModal: FC<IFillFromModalProps> = ({ data, onClose }) => {
    const queryClient = useQueryClient()
    const [value, setValue] = useState<string>()
    const [reportId, setReportId] = useState('')

    const { data: allReportItems, isLoading: isLoadingAllReportItems } = useGetAllReportItem({})

    useEffect(() => {
        if (data) {
            setValue(data?.answerValue?.toString() ?? '')
            setReportId(data?.reportItemId?.toString() ?? '')
        }
    }, [data])

    const { mutate, isPending } = useMutation({
        mutationFn: postFillReportItemForRegionMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'گزارش با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.ReportItemsByRegionId]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت گزارش با مشکل مواجه شد')
        }
    })

    return (
        <div className='space-y-5'>
            <SInputField label='' errors={{}} name={''}>
                <SSelect
                    disabled
                    leftSection={<NotebookPen />}
                    onChange={(value) => {
                        setReportId(value ?? '')
                    }}
                    data={convertDataSelectList(allReportItems?.data)}
                    isLoading={isLoadingAllReportItems}
                    value={reportId ?? ''}
                    placeholder='مقدار مورد نیاز را پر کنید'
                />
            </SInputField>

            <SInputField label='' errors={{}} name={''}>
                <SInput
                    inputType='number'
                    leftSection={<FileQuestion />}
                    onChange={(value) => {
                        setValue(value)
                    }}
                    value={value ?? ''}
                    placeholder='مقدار مورد نیاز را پر کنید'
                />
            </SInputField>

            <div className='col-span-full flex items-center justify-end gap-3 mt-5'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton
                    onClick={() => {
                        if (value?.trim().length === 0 || reportId.trim().length === 0) {
                            toast.error('باید مقادیر را پر کنید')
                            return
                        }

                        mutate({
                            answerValue: Number(value),
                            reportId: +reportId
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

export default FillFromModal

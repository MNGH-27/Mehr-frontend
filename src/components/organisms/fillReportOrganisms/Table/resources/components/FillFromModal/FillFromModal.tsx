import { type FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FileQuestion } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postFillReportItemForRegionMutationFn } from '@core/services/api/report/post-fill-report-item-for-region'
import { type TReportByRegionItemType } from '@core/types/api/report.type'
import { type TCriticalAny } from '@core/types/type-any'

interface IFillFromModalProps {
    onClose: () => void
    data?: TReportByRegionItemType
}

const FillFromModal: FC<IFillFromModalProps> = ({ data, onClose }) => {
    const queryClient = useQueryClient()
    const [value, setValue] = useState<string>()

    useEffect(() => {
        if (data?.answer?.answerValue) setValue(data?.answer?.answerValue.toString() ?? '')
    }, [data?.answer?.answerValue])

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
        <div>
            <div className='flex items-center justify-start gap-x-2 w-full flex-wrap text-secondary-900 font-medium'>
                <span>توضیح گزارش</span>
                <span>{data?.description}</span>
            </div>

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

            {/* {data?.reportItemId === 1 || data?.reportItemId === 2 ? (
                <SInputField label='' errors={{}} name={''}>
                    <SInput
                        inputType='other'
                        leftSection={<FileQuestion />}
                        onChange={(value) => {
                            setValue(value)
                        }}
                        value={value}
                        placeholder='مقدار مورد نیاز را پر کنید'
                    />
                </SInputField>
            ) : data?.reportItemId === 4 ? (
                <SInputField label='' errors={{}} name={''}>
                    <SSelect
                        leftSection={<FileQuestion />}
                        data={convertDataSelectList(data.answer ?? [])}
                        onChange={(value) => {
                            setValue(value ?? '')
                        }}
                        value={value as string}
                        placeholder='مقدار مورد نظر را انتخاب کنید'
                    />
                </SInputField>
            ) : (
                data && (
                    <SInputField label='' errors={{}} name={''}>
                        <SMultiSelect
                            leftSection={<FileQuestion />}
                            data={convertDataSelectList(data.answer ?? [])}
                            onChange={(value) => {
                                setValue(value ?? [''])
                            }}
                            value={value as string[]}
                            placeholder='مقادیر مورد نظر را انتخاب کنید'
                        />
                    </SInputField>
                )
            )} */}

            <div className='col-span-full flex items-center justify-end gap-3 mt-5'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton
                    onClick={() => {
                        if (value?.length === 0) {
                            toast.error('باید مقادیر را پر کنید')
                            return
                        }
                        // data?.reportItemType === 5
                        //     ? `[${(value as string[]).join(',')}]`
                        //     : data?.reportItemType === 1 || data?.reportItemType === 2
                        //       ? (value as string)
                        //       : undefined,

                        mutate({
                            answerStr: undefined,
                            answerValue: data?.reportItemType === 2 && value ? +value : undefined,
                            reportItemId: data?.reportItemId ?? -1
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

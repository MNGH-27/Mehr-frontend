import { type FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Layers2, Notebook, NotebookPen, Phone, PlusSquare, X } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'

import { REPORT_TYPE_LIST } from '@core/constants/dummy-data'
import { QueryKeysEnum } from '@core/enums/query-keys'
import { postCreateNewReportItemMutationFn } from '@core/services/api/report/post-create-new-report-item'
import { type TIdNameType } from '@core/types/id-name/types'
import { type TCriticalAny } from '@core/types/type-any'

import { addUserSchema, type IAddReportModalProps, type TAddReportForm } from './resources'

const AddReportModal: FC<IAddReportModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()
    const [itemsList, setItemsList] = useState<TIdNameType[]>([{ id: 0, name: '' }])

    const {
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<TAddReportForm>({
        resolver: yupResolver(addUserSchema)
    })

    const reportItemTypeIdWatch = watch('reportItemType')

    const { mutate, isPending } = useMutation({
        mutationFn: postCreateNewReportItemMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'سازمان با موفقیت اضافه شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.ReportItemsByRegionId]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ثبت سازمان با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid gap-5'
            onSubmit={handleSubmit((value) => {
                if (
                    itemsList.filter((item) => item.name.trim().length !== 0).length === 0 &&
                    (reportItemTypeIdWatch === '4' || reportItemTypeIdWatch === '5')
                ) {
                    toast.error('حداقل یک سوال را باید وارد کنید')
                    return
                }
                mutate({
                    description: value.description,
                    reportItemType: +value.reportItemType,
                    title: value.title,
                    items: itemsList
                        .filter((item) => item.name.trim().length !== 0)
                        .map((item) => ({ id: item.id, name: item.name })),
                    reportChart: 0 
                })
            })}
        >
            <Controller
                name='title'
                control={control}
                defaultValue={data?.title ?? ''}
                render={({ field }) => (
                    <SInputField label='نام' errors={errors} name={field.name}>
                        <SInput leftSection={<NotebookPen />} {...field} placeholder='نام را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='description'
                control={control}
                defaultValue={data?.description ?? ''}
                render={({ field }) => (
                    <SInputField label='توضیح' errors={errors} name={field.name}>
                        <SInput leftSection={<Notebook />} {...field} placeholder='توضیح را انتخاب کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='reportItemType'
                control={control}
                defaultValue={data?.reportItemType.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='نوع گزارش' errors={errors} name={field.name}>
                        <SSelect
                            data={REPORT_TYPE_LIST}
                            leftSection={<Layers2 />}
                            {...field}
                            onChange={(value) => {
                                field.onChange(value)

                                setItemsList([{ id: 0, name: '' }])
                            }}
                            placeholder='نوع گزارش را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />

            {(reportItemTypeIdWatch === '4' || reportItemTypeIdWatch === '5') && (
                <div>
                    <span className='text-lg font-medium'>گزینه ها را وارد کنید</span>
                    {itemsList.map((item, index) => (
                        <SInputField
                            key={index}
                            label={`_${index + 1}`}
                            errors={{}}
                            name={''}
                            className='mb-5 relative'
                        >
                            <SButton
                                type='button'
                                onClick={() => {
                                    if (itemsList.length !== 1)
                                        setItemsList((prevState) =>
                                            prevState.filter((_, prevIndex) => prevIndex !== index)
                                        )
                                }}
                                variant='TextError'
                                size='None'
                                className='absolute left-0 top-0'
                            >
                                <X />
                                حذف
                            </SButton>
                            <SInput
                                onChange={(value) =>
                                    setItemsList((prevState) =>
                                        prevState.map((prevItem, prevIndex) =>
                                            prevIndex === index
                                                ? {
                                                      id: index,
                                                      name: value
                                                  }
                                                : prevItem
                                        )
                                    )
                                }
                                value={item.name ?? ''}
                                leftSection={<Phone />}
                                placeholder={`عنوان گزینه ${index + 1} را وارد کنید`}
                            />
                        </SInputField>
                    ))}
                    <div className='mt-5 flex items-center justify-center gap-x-1 w-full after:block after:w-full after:h-[1px] after:bg-primary before:block before:w-full before:h-[1px] before:bg-primary'>
                        <SButton
                            type='button'
                            onClick={() => {
                                if (itemsList[itemsList.length - 1].name.trim().length === 0) {
                                    toast.error('ابتدا باید موارد قبلی را پر کنید')
                                    return
                                }
                                setItemsList((prevState) => prevState.concat([{ id: prevState.length, name: '' }]))
                            }}
                            variant='TextPrimary'
                            size='None'
                            className='shrink-0'
                        >
                            افزودن گزینه جدید
                            <PlusSquare />
                        </SButton>
                    </div>
                </div>
            )}

            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledSecondary'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default AddReportModal
